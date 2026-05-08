import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { CreateLinkPayload } from "@/lib/types";
import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router";

type UserLink = {
  id?: string | number;
  linkName: string;
  url: string;
};

const Home = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [links, setLinks] = useState<UserLink[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showNewLinkDialog, setShowNewLinkDialog] = useState<boolean>(false);
  const [newLinkData, setNewLinkData] = useState<CreateLinkPayload>({
    linkName: "",
    url: "",
  });
  const [addLinkResult, setAddLinkResult] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");

    const getUserDetails = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${storedToken}`,
          "Content-Type": "application/json",
        };

        const [userRes, linksRes] = await Promise.all([
          fetch("http://localhost:8080/api/v1/users/me", { headers }),
          fetch("http://localhost:8080/api/v1/links", { headers }),
        ]);

        if (!userRes.ok || !linksRes.ok) {
          sessionStorage.removeItem("token");
          navigate("/login");
          throw new Error("error fetching home data");
        }

        const userData = await userRes.json();
        const linksData = await linksRes.json();

        setUsername(userData.username);
        setLinks(Array.isArray(linksData) ? linksData : []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getUserDetails();
  }, [navigate]);

  const normalizeLink = (value: string) => {
    const trimmedValue = value.trim();

    if (!trimmedValue) return "";

    if (/^https?:\/\//i.test(trimmedValue)) {
      return trimmedValue;
    }

    return `https://${trimmedValue}`;
  };

  const handleAddLink = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedName = newLinkData.linkName.trim();
    const normalizedLink = normalizeLink(newLinkData.url);

    if (!normalizedName || !normalizedLink) return;

    const storedToken = sessionStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:8080/api/v1/links", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${storedToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ linkName: normalizedName, url: normalizedLink }),
      });

      if (!res.ok) {
        throw new Error(res.statusText || "failed to add link");
      }

      setAddLinkResult("success");
      setNewLinkData({ linkName: "", url: "" });
      setShowNewLinkDialog(false);
    } catch (error) {
      console.error(error);
      setAddLinkResult("failed");
    }
  };

  if (loading)
    return <div className="m-auto w-fit text-3xl mt-40">Loading...</div>;

  return (
    <div className="m-auto w-1/2">
      <div className="mt-20 flex flex-col items-center">
        <div className="text-3xl font-extrabold">Welcome, {username}</div>
        <div className="mt-8 w-1/2 flex flex-col items-center">
          <p className="text-2xl font-bold">Your Links</p>
          <div className="w-full flex flex-col  max-h-40 rounded-2xl p-4 border-2 mt-4">
            {links.length > 0 ? (
              links.map((savedLink, index) => (
                <a
                  key={savedLink.id ?? `${savedLink.url}-${index}`}
                  href={savedLink.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {savedLink.linkName}
                </a>
              ))
            ) : (
              <p>No links added yet.</p>
            )}
            <div className="flex justify-end">
              <Dialog
                open={showNewLinkDialog}
                onOpenChange={setShowNewLinkDialog}
              >
                <DialogTrigger asChild>
                  <Button variant="outline" className="cursor-pointer">
                    Insert New Link
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>New Link</DialogTitle>
                    <DialogDescription>
                      Insert a new link to your profile
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleAddLink} className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="link-name">Link Name</Label>
                      <Input
                        id="link-name"
                        name="link-name"
                        type="text"
                        required
                        value={newLinkData.linkName}
                        onChange={(event) =>
                          setNewLinkData({
                            ...newLinkData,
                            linkName: event.target.value,
                          })
                        }
                        placeholder="GitHub"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="link">Link URL</Label>
                      <div className="flex items-center rounded-md border border-input bg-transparent shadow-xs focus-within:ring-[3px] focus-within:ring-ring/50">
                        <span className="border-r border-input px-3 text-sm text-muted-foreground">
                          https://
                        </span>
                        <Input
                          id="link"
                          name="link"
                          type="text"
                          inputMode="url"
                          required
                          value={newLinkData.url}
                          onChange={(event) =>
                            setNewLinkData({
                              ...newLinkData,
                              url: event.target.value,
                            })
                          }
                          placeholder="example.com"
                          className="border-0 shadow-none focus-visible:ring-0"
                        />
                      </div>
                    </div>
                    <Button type="submit" className="cursor-pointer">
                      Save Link
                    </Button>
                    {addLinkResult ? <p>{addLinkResult}</p> : null}
                  </form>
                  <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                      <Button type="button" className="cursor-pointer">
                        Close
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
