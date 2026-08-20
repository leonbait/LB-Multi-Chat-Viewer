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



/* =========================================================
   CARGAR AL INICIAR
========================================================= */

window.addEventListener(
    "load",
    () => {

        cargarValoresGuardados(
            cajasChat,
            "chat"
        );


        cargarValoresGuardados(
            cajasViewer,
            "viewer"
        );


        cargarChats();

    }
);



/* =========================================================
   LEER LOCALSTORAGE
========================================================= */

function cargarValoresGuardados(
    cajas,
    prefijo
) {


    cajas.forEach(
        (caja, i) => {


            const dato =
                localStorage.getItem(
                    prefijo + i
                );


            if (dato) {

                caja.value = dato;

            }


        }
    );

}



/* =========================================================
   GUARDAR Y OBTENER URLS
========================================================= */

function guardarYObtenerUrls(
    cajas,
    prefijo
) {


    const urls = [];


    cajas.forEach(
        (caja, i) => {


            const valor =
                caja.value.trim();


            localStorage.setItem(
                prefijo + i,
                valor
            );


            if (valor !== "") {

                urls.push(valor);

            }


        }
    );


    return urls;

}



/* =========================================================
   CREAR IFRAME
========================================================= */

function crearIframe(
    url
) {


    const iframe =
        document.createElement(
            "iframe"
        );


    iframe.src = url;


    iframe.loading =
        "lazy";


    iframe.referrerPolicy =
        "no-referrer-when-downgrade";


    return iframe;

}



/* =========================================================
   ACTUALIZAR RESUMEN
========================================================= */

function actualizarResumen(
    chatCount,
    viewerCount
) {


    const resumen =
        document.getElementById(
            "source-summary"
        );


    const total =
        chatCount + viewerCount;



    if (total === 0) {


        resumen.textContent =
            "Sin fuentes conectadas";


        return;

    }



    const partes = [];



    if (chatCount) {


        partes.push(

            `${chatCount} chat${
                chatCount > 1
                    ? "s"
                    : ""
            }`

        );

    }



    if (viewerCount) {


        partes.push(

            `${viewerCount} viewer${
                viewerCount > 1
                    ? "s"
                    : ""
            }`

        );

    }



    resumen.textContent =
        partes.join(
            "  •  "
        );

}



/* =========================================================
   MOSTRAR INTERFAZ CON IFRAME
========================================================= */

function mostrarVistas() {


    document.getElementById(
        "empty-state"
    ).style.display =
        "none";


    document.getElementById(
        "viewers-bar"
    ).style.display =
        "grid";


    document.getElementById(
        "viewer"
    ).style.display =
        "grid";

}



/* =========================================================
   MOSTRAR ESTADO VACÍO
========================================================= */

function mostrarEstadoVacio() {


    document.getElementById(
        "empty-state"
    ).style.display =
        "flex";


    document.getElementById(
        "viewers-bar"
    ).style.display =
        "none";


    document.getElementById(
        "viewer"
    ).style.display =
        "none";

}



/* =========================================================
   CARGAR CHATS
========================================================= */

function cargarChats() {


    const viewer =
        document.getElementById(
            "viewer"
        );


    const viewersBar =
        document.getElementById(
            "viewers-bar"
        );



    /* -----------------------------------------------------
       LIMPIAR VISTA ANTERIOR
    ------------------------------------------------------ */

    viewer.innerHTML =
        "";


    viewersBar.innerHTML =
        "";



    viewer.style.gridTemplateColumns =
        "1fr";


    viewersBar.style.gridTemplateColumns =
        "1fr";



    /* -----------------------------------------------------
       OBTENER URLS
    ------------------------------------------------------ */

    const chatUrls =
        guardarYObtenerUrls(
            cajasChat,
            "chat"
        );


    const viewerUrls =
        guardarYObtenerUrls(
            cajasViewer,
            "viewer"
        );



    /* -----------------------------------------------------
       ACTUALIZAR CONTADOR
    ------------------------------------------------------ */

    actualizarResumen(
        chatUrls.length,
        viewerUrls.length
    );



    /* -----------------------------------------------------
       SIN FUENTES
    ------------------------------------------------------ */

    if (
        chatUrls.length === 0 &&
        viewerUrls.length === 0
    ) {


        mostrarEstadoVacio();


        return;

    }



    /* -----------------------------------------------------
       MOSTRAR WORKSPACE
    ------------------------------------------------------ */

    mostrarVistas();



    /* -----------------------------------------------------
       VIEWERS
    ------------------------------------------------------ */

    if (
        viewerUrls.length > 0
    ) {


        viewersBar.style.gridTemplateColumns =

            `repeat(
                ${viewerUrls.length},
                minmax(0, 1fr)
            )`;



        viewerUrls.forEach(
            (url) => {


                const iframe =
                    crearIframe(
                        url
                    );


                viewersBar.appendChild(
                    iframe
                );


            }
        );

    }



    /* -----------------------------------------------------
       CHATS
    ------------------------------------------------------ */

    if (
        chatUrls.length > 0
    ) {


        viewer.style.gridTemplateColumns =

            `repeat(
                ${chatUrls.length},
                minmax(0, 1fr)
            )`;



        chatUrls.forEach(
            (url) => {


                const iframe =
                    crearIframe(
                        url
                    );


                viewer.appendChild(
                    iframe
                );


            }
        );

    }

}