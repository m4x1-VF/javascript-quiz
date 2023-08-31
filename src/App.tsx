import { Container, Stack, Typography } from "@mui/material";
import { FerrariLogo } from "./FerrariLogo";
import { Formula1Logo } from "./Formula1Logo";
import { useQuestionsStore } from "./Store/questions";
import Start from "./Start";
import Game from "./components/Game";
import "./App.css";

function App() {
  const questions = useQuestionsStore((state) => state.questions);
  console.log(questions);

  return (
    <main>
      <Container maxWidth="sm">
        <Stack
          direction="row"
          gap={2}
          alignItems="center"
          justifyContent="center"
        >
          <FerrariLogo />
          <Typography variant="h4" component="h1">
            Formula 1 & Ferrari Quizz
          </Typography>
          <Formula1Logo />
        </Stack>
        {questions.length === 0 && <Start />}
        {questions.length > 0 && <Game />}
      </Container>
    </main>
  );
}

export default App;
