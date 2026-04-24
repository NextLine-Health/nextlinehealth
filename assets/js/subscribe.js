const SUPABASE_URL = "https://vabayjmqbshppfwmwirk.supabase.co";
const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_qYDwIMz_dShUTSrV_fpGSg_1xvgni2h";
const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY,
);

const form = document.getElementById("subscribe-form");
const emailInput = document.getElementById("subscribe-email");
const honeypot = document.getElementById("subscribe-website");
const submitBtn = document.getElementById("subscribe-btn");
const message = document.getElementById("subscribe-message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (honeypot.value) {
    message.textContent = "Thanks for subscribing!";
    form.reset();
    return;
  }

  const email = emailInput.value.trim().toLowerCase();

  submitBtn.disabled = true;
  submitBtn.textContent = "Subscribing...";
  message.textContent = "";

  const { error } = await supabaseClient.from("subscribers").insert({ email });

  submitBtn.disabled = false;
  submitBtn.textContent = "Subscribe";

  if (error) {
    if (error.code === "23505") {
      message.textContent = "You're already subscribed.";
    } else if (error.code === "23514") {
      message.textContent = "Please enter a valid email.";
    } else {
      message.textContent = "Something went wrong. Try again.";
      console.error(error);
    }
    return;
  }

  message.textContent = "Thanks for subscribing!";
  form.reset();
});
