import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import User from "../models/User";

// Serializzazione/deserializzazione
passport.serializeUser((user: any, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

// ===== GOOGLE STRATEGY (solo se configurato) =====
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: "/api/auth/google/callback",
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    const email = profile.emails![0].value;
                    let user = await User.findOne({ email });
                    if (!user) {
                        user = new User({
                            email,
                            password: Math.random().toString(36).slice(-8),
                            name: profile.displayName,
                            avatar: profile.photos?.[0]?.value
                        });
                        await user.save();
                    }
                    done(null, user);
                } catch (err) {
                    done(err, null);
                }
            }
        )
    );
    console.log("✅ Google OAuth configurato");
} else {
    console.log("⚠️ Google OAuth non configurato (mancano GOOGLE_CLIENT_ID o GOOGLE_CLIENT_SECRET)");
}

// ===== FACEBOOK STRATEGY (solo se configurato) =====
if (process.env.FB_APP_ID && process.env.FB_APP_SECRET) {
    passport.use(
        new FacebookStrategy(
            {
                clientID: process.env.FB_APP_ID!,
                clientSecret: process.env.FB_APP_SECRET!,
                callbackURL: "/api/auth/facebook/callback",
                profileFields: ["id", "displayName", "email"], // richiede email
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    console.log('Profile:', profile); // Debug: vedi cosa arriva

                    const email = profile.emails?.[0]?.value;

                    if (!email) {
                        return done(new Error("Email non fornita da Facebook"), null);
                    }

                    let user = await User.findOne({ email });
                    if (!user) {
                        user = new User({
                            email,
                            password: Math.random().toString(36).slice(-8),
                            name: profile.displayName,
                        });
                        await user.save();
                    }
                    done(null, user);
                } catch (err) {
                    done(err, null);
                }
            }
        )
    );
    console.log("✅ Facebook OAuth configurato");
} else {
    console.log("⚠️ Facebook OAuth non configurato (mancano FB_APP_ID o FB_APP_SECRET)");
}


export default passport;