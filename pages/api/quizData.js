import { quizData } from "../../quizData";

export default function handler(req, res) {
    res.status(200).json(quizData);
}
