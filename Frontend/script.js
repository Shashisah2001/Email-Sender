document
  .getElementById("emailForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    console.log("Form Data:", data);

    try {
      const response = await fetch("/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.text();
      document.getElementById("responseMessage").innerText = result;
    } catch (error) {
      console.error("Fetch error:", error);
      document.getElementById("responseMessage").innerText =
        "Error occurred while sending email.";
    }
  });
