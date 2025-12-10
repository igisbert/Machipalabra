import styles from "./ShareTemplate.module.css";
import { shareStatus, SHARE_STATUS, correctAnswers, incorrectAnswers } from "@/store/game.js";
import Letters from "./Letters";
import ScoreItem from "./ScoreItem";

export default function ShareTemplate() {

    if (shareStatus.value !== SHARE_STATUS.SHARING) {
        return <div id="share-template"></div>
    }

    const score = correctAnswers.value;
    const totalQuestions = correctAnswers.value + incorrectAnswers.value;

    let message;
    if (score === totalQuestions ) {
        message = "¡Eres un auténtico veterano!";
    } else if (score >= 20) {
        message = "";
    } else if (score >= 10) {
        message = "¡Bien hecho!";
    } else {
        message = "Sigues en contrato rookie";
    }



    return (
        <div className={styles.shareTemplate} id="share-template">
            <div className={styles.right}>
                <div className={styles.scoreItem}>
                    Aciertos
                    <span>{score}</span>
                </div>
                
            </div>
            <div className={styles.left}>
                <div className={styles.scoreItem}>
                    Fallos
                    <span>{incorrectAnswers.value}</span>
                </div>
            </div>

            <Letters />
            
            <div className={styles.label}>
                {message}                
            </div>
        </div>
    );
}
