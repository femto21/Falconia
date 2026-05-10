import type { PublicProfile } from "@/lib/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const PublicProfilePage = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState<PublicProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const normalizedUsername = username?.trim();

    if (!normalizedUsername) {
      setError("Profile not found.");
      setLoading(false);
      return;
    }

    const loadProfile = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `http://localhost:8080/api/v1/profiles/${encodeURIComponent(normalizedUsername)}`,
        );

        if (!res.ok) {
          throw new Error(res.status === 404 ? "Profile not found." : "Failed to load profile.");
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
          fetchError instanceof Error ? fetchError.message : "Failed to load profile.",
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
    <div className="m-auto mt-16 max-w-2xl px-6">
      <div className="rounded-3xl border bg-card p-8 text-center shadow-sm">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
          Falconia
        </p>
        <h1 className="mt-4 text-4xl font-extrabold">
          {displayName || `@${profile.username}`}
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">@{profile.username}</p>

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
            <p className="text-muted-foreground">No public links available yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublicProfilePage;
