import type { PublicProfile } from "@/lib/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const PROFILE_GRADIENTS = [
  "linear-gradient(135deg, #f97316 0%, #fb7185 45%, #818cf8 100%)",
  "linear-gradient(135deg, #0f766e 0%, #14b8a6 40%, #67e8f9 100%)",
  "linear-gradient(135deg, #1d4ed8 0%, #22c55e 55%, #facc15 100%)",
  "linear-gradient(135deg, #7c3aed 0%, #ec4899 50%, #f59e0b 100%)",
  "linear-gradient(135deg, #111827 0%, #2563eb 45%, #38bdf8 100%)",
];

const getRandomGradient = () =>
  PROFILE_GRADIENTS[Math.floor(Math.random() * PROFILE_GRADIENTS.length)];

const PublicProfilePage = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState<PublicProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [backgroundGradient, setBackgroundGradient] = useState(
    getRandomGradient,
  );

  useEffect(() => {
    const normalizedUsername = username?.trim();

    if (!normalizedUsername) {
      setError("Profile not found.");
      setLoading(false);
      return;
    }

    setBackgroundGradient(getRandomGradient());

    const loadProfile = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `http://localhost:8080/api/v1/profiles/${encodeURIComponent(normalizedUsername)}`,
        );

        if (!res.ok) {
          throw new Error(
            res.status === 404
              ? "Profile not found."
              : "Failed to load profile.",
          );
        }

        const profileData = (await res.json()) as PublicProfile;
        setProfile({
          ...profileData,
          links: Array.isArray(profileData.links) ? profileData.links : [],
        });
      } catch (fetchError) {
        console.error(fetchError);
        setProfile(null);
        setError(
          fetchError instanceof Error
            ? fetchError.message
            : "Failed to load profile.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [username]);

  if (loading) {
    return <div className="m-auto mt-40 w-fit text-3xl">Loading...</div>;
  }

  if (error || !profile) {
    return (
      <div className="m-auto mt-24 max-w-2xl px-6 text-center">
        <h1 className="text-4xl font-extrabold">Profile unavailable</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          {error ?? "This profile could not be loaded."}
        </p>
      </div>
    );
  }

  const displayName = `${profile.firstName} ${profile.lastName}`.trim();

  return (
    <div
      className="mt-10 rounded-[2rem] px-6 py-16"
      style={{ backgroundImage: backgroundGradient }}
    >
      <div className="m-auto max-w-2xl">
        <div className="rounded-3xl border bg-card/90 p-8 text-center shadow-sm backdrop-blur">
          <h1 className="mt-4 text-4xl font-extrabold">
            {displayName || `@${profile.username}`}
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            @{profile.username}
          </p>

          <div className="mt-10 flex flex-col gap-4">
            {profile.links.length > 0 ? (
              profile.links.map((link, index) => (
                <a
                  key={link.id ?? `${link.url}-${index}`}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl border px-5 py-4 text-lg font-semibold transition hover:bg-accent"
                >
                  {link.linkName}
                </a>
              ))
            ) : (
              <p className="text-muted-foreground">
                No public links available yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicProfilePage;
