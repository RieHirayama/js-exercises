// 指定ファイルを OneDrive にアップロード
// API を実行するためのアクセストークンは、[Graph Explorer](https://developer.microsoft.com/en-us/graph/graph-explorer) で取得
// Microsoft Graph の「小さいファイルのアップロード」(PUT /content) を fetch() で呼ぶ形で実装
document.getElementById("upload").addEventListener("click", async () => {
  const token = document.getElementById("token").value.trim();
  const file = document.getElementById("file").files?.[0];
  if (!token || !file) return;

  const url = `https://graph.microsoft.com/v1.0/me/drive/root:/Uploads/${file.name}:/content`;
  
  try {
    const res = await fetch(url, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      body: file,
    });
    console.log(await res.json());
  } catch (e) {
    console.error(e.message);
  }
});
