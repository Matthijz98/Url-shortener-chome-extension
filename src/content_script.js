import Mellowtel from "mellowtel";
import { CONFIG_KEY } from "./constants";

(async () => {
    const mellowtel = new Mellowtel(CONFIG_KEY);
    await mellowtel.initContentScript();
})();