// Shared by the server layout and the client Preloader, so no "use client".

/** sessionStorage key set once the intro has played this session. */
export const INTRO_SESSION_KEY = "preloader-shown";

/**
 * Runs in <head> before the first paint. It decides up front whether the
 * intro will play and writes the answer to `<html data-intro>`, so a repeat
 * visit never flashes the overlay and a first visit never flashes the page.
 */
export const INTRO_GATE_SCRIPT = `(function(){try{var d=document.documentElement;var seen=sessionStorage.getItem(${JSON.stringify(
  INTRO_SESSION_KEY,
)});var reduced=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;d.dataset.intro=seen||reduced?"done":"playing";}catch(e){}})();`;
