function useLike(
  itemId: number | null
): [() => Promise<void>, () => Promise<void>] {
  const manageLikes = async (action: "add" | "remove") => {
    if (itemId) {
      await fetch(`/api/items/${itemId}/likes`, {
        method: "POST",
        body: JSON.stringify({ action }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  };
  const addLike = async () => await manageLikes("add");
  const removeLike = async () => await manageLikes("remove");
  return [addLike, removeLike];
}

export default useLike;
