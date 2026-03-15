import React, { useCallback, useEffect, useState } from "react";
import Navbar from "./Navbar";
import LinkCard from "./LinkCard";
import ShortenURLModal from "./ShortenURLModal";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { nanoid } from "nanoid";
import { auth, firestore } from "../../firebase";
import copy from "copy-to-clipboard";

const Account = () => {
  const [fetchingLinks, setFetchingLinks] = useState(true);
  const [links, setLinks] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [newLinkToaster, setNewLinkToaster] = useState(false);

  const linkPathRef = collection(
    firestore,
    "users",
    auth.currentUser.uid,
    "links",
  );

  const handleShortenUrl = async (name, longURL) => {
    if (!auth.currentUser) return;

    const link = {
      name,
      longURL:
        longURL.includes("http://") || longURL.includes("https://")
          ? longURL
          : `http://${longURL}`,
      createdAt: serverTimestamp(),
      shortCode: nanoid(6),
      totalClicks: 0,
    };

    const resp = await addDoc(linkPathRef, link);

    setLinks((links) => [
      ...links,
      { ...link, createdAt: new Date(), id: resp.id },
    ]);

    setOpenModal(false);
  };

  useEffect(() => {
    const fetch = async () => {
      const snapshot = await getDocs(linkPathRef);

      const tempLinks = [];

      snapshot.forEach((doc) =>
        tempLinks.push({
          ...doc.data(),
          id: doc.id,
          createdAt: doc.data().createdAt.toDate(),
        }),
      );

      setLinks(tempLinks);

      setTimeout(() => {
        setFetchingLinks(false);
      }, 1000);
    };

    fetch();
  }, []);

  const handleDeleteLink = useCallback(async (linkId) => {
    if (window.confirm("Do you want to delete the link?")) {
      const docRef = doc(linkPathRef, linkId);
      await deleteDoc(docRef);

      setLinks((oldLinks) => oldLinks.filter((link) => link.id !== linkId));
    }
  }, []);

  const handleCopyLink = useCallback((shortUrl) => {
    copy(shortUrl);
    setNewLinkToaster(true);

    setTimeout(() => {
      setNewLinkToaster(false);
    }, 2000);
  }, []);

  return (
    <>
      <Navbar />

      {/* Toast */}
      {newLinkToaster && (
        <div className="toast toast-top toast-center">
          <div className="bg-black text-white px-4 py-2 rounded-md shadow-lg">
            Link copied to clipboard
          </div>
        </div>
      )}

      {/* Modal */}
      {openModal && (
        <ShortenURLModal
          createShortenLink={handleShortenUrl}
          handleClose={() => setOpenModal(false)}
        />
      )}

      {/* Page Content */}
      <div className="max-w-4xl mx-auto mt-10 px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <h1 className="text-3xl font-bold">Links</h1>

          <button
            onClick={() => setOpenModal(true)}
            className="btn btn-primary rounded-none"
          >
            Create new
          </button>
        </div>

        {/* Loading */}
        {fetchingLinks ? (
          <div className="flex justify-center py-20">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : !links.length ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center text-center py-20">
            <img src="/nolinks.svg" alt="No links" className="w-40 mb-4" />

            <p className="text-lg text-base-content/70">You have no links</p>
          </div>
        ) : (
          /* Links List */
          <div className="space-y-6">
            {links
              .sort(
                (prevLink, nextLink) => nextLink.createdAt - prevLink.createdAt,
              )
              .map((link) => (
                <LinkCard
                  key={link.id}
                  {...link}
                  deleteLink={handleDeleteLink}
                  copyLink={handleCopyLink}
                />
              ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Account;
