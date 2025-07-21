export const  handleClaimPoints = async ( selectedUser,setClaimedPoints,setAllUsers) => {
  if (!selectedUser) {
    alert("Please select a user.");
    return;
  }

  const points = Math.floor(Math.random() * 10) + 1;

  try {
    const response = await fetch("http://localhost:4000/updatePoints", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: selectedUser,
        points,
      }),
    });

    const data = await response.json();

    if (data.user) {
      setClaimedPoints({ user: selectedUser, points });

      // Update the local user list with new points
      setAllUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.userName === selectedUser
            ? { ...user, userPoints: user.userPoints + points }
            : user
        )
      );
    }
  } catch (error) {
    console.error("Error updating points:", error);
  }
};
