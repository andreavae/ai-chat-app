import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import User from "../models/User";

// ✅ SERIALIZZAZIONE (semplificata per JWT)
passport.serializeUser((user: any, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

// ===== GOOGLE STRATEGY =====
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
                    return done(null, user);
                } catch (err) {
                    return done(err as Error);
                }
            }
        )
    );
    console.log("✅ Google OAuth Configured");
} else {
    console.log("❌ Google OAuth Missing Credentials in .env");
}

// ===== FACEBOOK STRATEGY =====
if (process.env.FB_APP_ID && process.env.FB_APP_SECRET) {
    passport.use(
        new FacebookStrategy(
            {
                clientID: process.env.FB_APP_ID,
                clientSecret: process.env.FB_APP_SECRET,
                callbackURL: "/api/auth/facebook/callback",
                profileFields: ["id", "emails", "name", "picture"],
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
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
                            avatar: profile.photos?.[0]?.value
                        });
                        await user.save();
                    }
                    return done(null, user);
                } catch (err) {
                    return done(err as Error, null);
                }
            }
        )
    );
    console.log("✅ Facebook OAuth Configured");
} else {
    console.log("❌ Facebook OAuth Missing Credentials in .env");
}

export default passport;