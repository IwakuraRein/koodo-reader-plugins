async function getDictText(text, from, to, axios, t, config) {
  const proxyUrl = (config && config.proxyUrl) || "http://127.0.0.1:18080/";
  const url = `https://aoilang.com/dict/${encodeURIComponent(text)}`;

  const response = await axios.get(proxyUrl.replace(/\/?$/, "/") + url, {
    headers: {
      "X-Requested-With": "XMLHttpRequest"
    }
  });

  const doc = new DOMParser().parseFromString(response.data, "text/html");
  const entry =
    doc.querySelector("body .container .entry-wrapper") ||
    doc.querySelector(".entry-wrapper");

  if (!entry) return t("No result");

  entry.querySelectorAll("a[href]").forEach((link) => {
    const href = link.getAttribute("href") || "";
    if (href.startsWith("/")) {
      link.setAttribute("href", "https://aoilang.com" + href);
    }
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");
  });

  return entry.innerHTML;
}

window.getDictText = getDictText;