export const handleClaimPoints = async (selectedUser, setClaimedPoints, setAllUsers) => {
  if (!selectedUser) {
    alert("Please select a user.");
    return;
  }

  const points = Math.floor(Math.random() * 10) + 1;

  try {
    // Update user points
    const res = await fetch("https://scorely-backend.onrender.com/updatePoints", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userName: selectedUser, points }),
    });

    const data = await res.json();

    if (data.message === "Points updated") {
      // Save claim log
      await fetch("https://scorely-backend.onrender.com/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName: selectedUser, points }),
      });

      setClaimedPoints({ user: selectedUser, points });

      // Refresh list
      const updatedUsers = await fetch("https://scorely-backend.onrender.com/sendUser");
      const list = await updatedUsers.json();
      setAllUsers(list);
    }
  } catch (err) {
    console.error("Error claiming points:", err);
  }
};
