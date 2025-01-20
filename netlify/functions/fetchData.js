const fetch = require("node-fetch"); // Versión 2 es compatible con CommonJS

exports.handler = async (event) => {
  const { pais, idioma, categoria } = event.queryStringParameters;

  const apiUrl = `https://estelarbetpromociones.com/wp-content/themes/estelarbetpromociones/assets/controladores/ControllerPosts.php?pais=${pais}&idioma=${idioma}`;
  const apiUrl2 = `https://estelarbetpromociones.com/wp-content/themes/estelarbetpromociones/assets/controladores/ControllerPosts.php?pais=${pais}&idioma=${idioma}&categoria=${categoria}`;

  try {
    // Ejecutar ambas solicitudes en paralelo
    const [response1, response2] = await Promise.all([
      fetch(apiUrl),
      fetch(apiUrl2),
    ]);

    // Procesar ambas respuestas
    const data1 = await response1.json();
    const data2 = await response2.json();

    // Combinar las respuestas
    const combinedData = {
      api1: data1,
      api2: data2,
    };

    return {
      statusCode: 200,
      body: JSON.stringify(combinedData),
    };
  } catch (error) {
    console.error("Error al conectar con la API:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error interno en la función serverless." }),
    };
  }
};
