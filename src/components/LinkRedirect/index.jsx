import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  updateDoc,
  increment,
} from "firebase/firestore";
import { firestore } from "../../firebase";

const LinkRedirect = () => {
  const { shortCode } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const redirect = async () => {
      try {
        const ref = doc(firestore, "links", shortCode);
        const snap = await getDoc(ref);

        if (!snap.exists()) {
          setLoading(false);
          return;
        }

        const { longURL, linkId, userUid } = snap.data();

        const linkDocRef = doc(
          firestore,
          "users",
          userUid,
          "links",
          linkId
        );

        await updateDoc(linkDocRef, {
          totalClicks: increment(1),
        });

        window.location.href = longURL;
      } catch (error) {
        console.error("Redirect failed:", error);
        setLoading(false);
      }
    };

    redirect();
  }, [shortCode]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="text-lg text-base-content/70">
          Redirecting to the link…
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">
          Link is invalid
        </h2>
        <p className="text-base-content/60">
          The short link you are trying to access does not exist.
        </p>
      </div>
    </div>
  );
};

export default LinkRedirect;