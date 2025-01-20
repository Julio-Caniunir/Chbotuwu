const fetch = require("node-fetch"); // Versión 2 es compatible con CommonJS

exports.handler = async (event) => {
  const { pais, idioma } = event.queryStringParameters;

  const apiUrl = `https://estelarbetpromociones.com/wp-content/themes/estelarbetpromociones/assets/controladores/ControllerPosts.php?pais=${pais}&idioma=${idioma}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error("Error al conectar con la API:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error interno en la función serverless." }),
    };
  }
};
