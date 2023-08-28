import { Button } from "@mui/material";
import usequesionsData from "../Hooks/useQuestionsData";
import { useQuestionsStore } from "../Store/questions";

const Footer = () => {
  const { correct, incorrect, unanswered } = usequesionsData();
  const reset = useQuestionsStore((state) => state.reset);

  return (
    <footer style={{ marginTop: "16px" }}>
      <strong>{`✅ ${correct} correctas - ❌ ${incorrect} incorrectas - ❓︰ ${unanswered} sin contestar`}</strong>
      <section style={{ marginTop: "16px" }}>
        <Button onClick={() => reset()}>Reiniciar juego</Button>
      </section>
    </footer>
  );
};

export default Footer;
