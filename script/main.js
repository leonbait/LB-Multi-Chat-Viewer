const cajasChat = [
    document.getElementById("url1"),
    document.getElementById("url2"),
    document.getElementById("url3")
];

const cajasViewer = [
    document.getElementById("viewerUrl1"),
    document.getElementById("viewerUrl2"),
    document.getElementById("viewerUrl3")
];

window.onload = () => {
    // Cargar URLs de chats guardadas
    cajasChat.forEach((caja, i) => {
        const dato = localStorage.getItem("chat" + i);
        if (dato) caja.value = dato;
    });

    // Cargar URLs de viewers guardadas
    cajasViewer.forEach((caja, i) => {
        const dato = localStorage.getItem("viewer" + i);
        if (dato) caja.value = dato;
    });

    cargarChats();
};

function cargarChats() {
    const viewer = document.getElementById("viewer");
    const viewersBar = document.getElementById("viewers-bar");

    viewer.innerHTML = "";
    viewersBar.innerHTML = "";

    let chatUrls = [];
    let viewerUrls = [];

    // Procesar chats
    cajasChat.forEach((caja, i) => {
        const valor = caja.value.trim();
        localStorage.setItem("chat" + i, valor);
        if (valor !== "") chatUrls.push(valor);
    });

    // Procesar viewers
    cajasViewer.forEach((caja, i) => {
        const valor = caja.value.trim();
        localStorage.setItem("viewer" + i, valor);
        if (valor !== "") viewerUrls.push(valor);
    });

    // Configurar Grid de Viewers
    if (viewerUrls.length > 0) {
        viewersBar.style.gridTemplateColumns = `repeat(${viewerUrls.length}, 1fr)`;
        
        viewerUrls.forEach(url => {
            const iframe = document.createElement("iframe");
            iframe.src = url;
            viewersBar.appendChild(iframe);
        });
    }

    // Configurar Grid de Chats
    if (chatUrls.length === 0 && viewerUrls.length === 0) {
        viewer.innerHTML = "<h2 style='margin:auto;color:white;font-weight:normal;'>Agrega al menos una URL de chat o contador.</h2>";
        return;
    }

    if (chatUrls.length > 0) {
        viewer.style.gridTemplateColumns = `repeat(${chatUrls.length}, 1fr)`;

        chatUrls.forEach(url => {
            const iframe = document.createElement("iframe");
            iframe.src = url;
            viewer.appendChild(iframe);
        });
    }
}