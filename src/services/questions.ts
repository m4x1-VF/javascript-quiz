export const getAllQuestions = async () => {
  const masterKey = `$2b$10$kVMgxE${import.meta.env.VITE_X_MASTER_KEY}`;
  const accessKey = `$2b$10$B43Zs2jX4fA6nWrRjP${
    import.meta.env.VITE_X_ACCESS_KEY
  }`;
  const res = await fetch(
    "https://api.jsonbin.io/v3/b/64f10aa8d972192679bcd358",
    {
      headers: {
        "X-Master-Key": masterKey,
        "X-Access-Key": accessKey,
      },
    }
  );
  const json = await res.json();
  return json.record;
};
