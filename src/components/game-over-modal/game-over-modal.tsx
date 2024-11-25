import { Text, Modal, View, Pressable } from "react-native";
import { useGameOverModalStyles } from "./game-over-modal.styles";

interface GameOverModalProps {
  onClose: () => void;
}

const GameOverModal = ({ onClose }: GameOverModalProps) => {
  const styles = useGameOverModalStyles();

  return (
    <Modal animationType="slide" transparent visible onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>GAME OVER</Text>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={onClose}
          >
            <Text style={styles.textStyle}>Try Again</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default GameOverModal;
