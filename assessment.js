/* Café des Langues — placement assessment
   -----------------------------------------------------------
   IMPORTANT SETUP STEP:
   Replace FORM_ENDPOINT below with your own Formspree endpoint
   (create a free form at https://formspree.io, separate from
   your enrollment form so results don't mix together). Until
   you do, results still show on screen — they just won't be
   emailed to you automatically, and the visitor will see a
   fallback "email us your result" option instead.
------------------------------------------------------------ */
const FORM_ENDPOINT = "https://formspree.io/f/REPLACE_WITH_YOUR_FORM_ID";

const QUIZ_ANSWERS = {
  q1: "bonjour",
  q2: "suis",
  q3: "a",
  q4: "voyagerais",
  q5: "triste"
};

function computeLevel(score){
  if (score <= 8){
    return {
      label: "Débutant · Beginner",
      note: "Start from the basics with confidence. Le Groupe's beginner cohort or a handful of Le Particulier sessions are both great starting points — mention this result when you enroll."
    };
  }
  if (score <= 17){
    return {
      label: "Intermédiaire · Intermediate",
      note: "You've got a working foundation. A cohort focused on conversation, or one-on-one sessions targeting your specific gaps, will move you forward quickly."
    };
  }
  return {
    label: "Avancé · Advanced",
    note: "You're already comfortable with a lot of French. One-on-one sessions are usually the best fit here, so lessons can focus on nuance, fluency, and whatever specific goals you have."
  };
}

function handleAssessmentSubmit(event){
  event.preventDefault();

  const form = event.target;
  const statusEl = document.getElementById("assess-status");
  const resultPanel = document.getElementById("result-panel");

  const name = form.elements["name"].value.trim();
  const email = form.elements["email"].value.trim();

  if (!name || !email){
    statusEl.textContent = "Please add your name and email so we can send your result.";
    statusEl.className = "assess-status is-error";
    return;
  }

  // Score the quiz (2 points per correct answer)
  let quizScore = 0;
  Object.keys(QUIZ_ANSWERS).forEach(function(qName){
    const selected = form.elements[qName] ? form.elements[qName].value : null;
    if (selected === QUIZ_ANSWERS[qName]) quizScore += 2;
  });

  // Score the self-assessment checklist (3 points per checked item)
  const checks = form.querySelectorAll('input[name="can-do"]:checked');
  const checklistScore = checks.length * 3;

  const totalScore = quizScore + checklistScore;
  const result = computeLevel(totalScore);

  // Show result immediately regardless of email outcome
  document.getElementById("result-level").textContent = result.label;
  document.getElementById("result-note").textContent = result.note;
  resultPanel.classList.add("is-visible");
  resultPanel.scrollIntoView({ behavior: "smooth", block: "center" });

  if (FORM_ENDPOINT.indexOf("REPLACE_WITH_YOUR_FORM_ID") !== -1){
    statusEl.textContent = "Result ready below. (Email delivery isn't connected yet — see README.)";
    statusEl.className = "assess-status";
    return;
  }

  statusEl.textContent = "Sending your result…";
  statusEl.className = "assess-status";

  fetch(FORM_ENDPOINT, {
    method: "POST",
    headers: { "Accept": "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({
      name: name,
      email: email,
      level: result.label,
      score: totalScore
    })
  })
  .then(function(response){
    if (response.ok){
      statusEl.textContent = "Sent! We'll follow up if anything stands out.";
      statusEl.className = "assess-status is-ok";
    } else {
      throw new Error("Formspree responded with an error");
    }
  })
  .catch(function(){
    const subject = encodeURIComponent("Placement assessment result — " + name);
    const body = encodeURIComponent(
      "Name: " + name + "\nEmail: " + email + "\nLevel: " + result.label + "\nScore: " + totalScore + "/25"
    );
    statusEl.innerHTML = 'We couldn\'t send this automatically. <a href="mailto:cafedeslangues.edu@gmail.com?subject=' + subject + '&body=' + body + '" style="text-decoration:underline;">Click here to email us your result instead</a>.';
    statusEl.className = "assess-status is-error";
  });
}

document.addEventListener("DOMContentLoaded", function(){
  const form = document.getElementById("assessment-form");
  if (form){
    form.addEventListener("submit", handleAssessmentSubmit);
  }
});
