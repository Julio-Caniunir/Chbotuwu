const fetch = require("node-fetch");

exports.handler = async (event) => {
  const { pais, idioma } = event.queryStringParameters || {};

  if (!pais || !idioma) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Faltan parámetros obligatorios (pais, idioma)." }),
    };
  }

  const apiUrl = `https://estelarbetpromociones.com/wp-content/themes/estelarbetpromociones/assets/controladores/ControllerPosts.php?pais=${pais}&idioma=${idioma}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: "Error al conectar con la API." }),
      };
    }

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error("Error en la función serverless:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error interno en la función serverless." }),
    };
  }
};
