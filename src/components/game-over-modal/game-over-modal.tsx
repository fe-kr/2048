import { Text, Modal, View, Pressable } from "react-native";
import { useGameOverModalStyles } from "./game-over-modal.styles";

interface GameOverModalProps {
  title: string;
  onClose: () => void;
}

const GameOverModal = ({ title, onClose }: GameOverModalProps) => {
  const styles = useGameOverModalStyles();

  return (
    <Modal animationType="slide" transparent visible onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{title}</Text>
          <Pressable style={styles.button} onPress={onClose}>
            <Text style={styles.textStyle}>Try Again</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default GameOverModal;
