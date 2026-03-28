import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";

export default function App() {
  const [tareas, setTareas] = useState([
    { id: "1", texto: "Comprar el pan", completada: false },
    { id: "2", texto: "Llamar al médico", completada: false },
  ]);
  const [nuevaTarea, setNuevaTarea] = useState("");

  const agregarTarea = () => {
    if (nuevaTarea.trim() === "") {
      Alert.alert("Escribe una tarea primero");
      return;
    }
    setTareas([
      ...tareas,
      { id: Date.now().toString(), texto: nuevaTarea.trim(), completada: false },
    ]);
    setNuevaTarea("");
  };

  const completarTarea = (id: string) => {
    setTareas(
      tareas.map((t) => (t.id === id ? { ...t, completada: !t.completada } : t))
    );
  };

  const borrarTarea = (id: string) => {
    setTareas(tareas.filter((t) => t.id !== id));
  };

  return (
    <View style={styles.contenedor}>

      <Text style={styles.titulo}>Mis Tareas</Text>

      <View style={styles.inputContenedor}>
        <TextInput
          style={styles.input}
          placeholder="Nueva tarea..."
          placeholderTextColor="#666"
          value={nuevaTarea}
          onChangeText={setNuevaTarea}
        />
        <TouchableOpacity style={styles.boton} onPress={agregarTarea}>
          <Text style={styles.botonTexto}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tareas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.tarea}>
            <TouchableOpacity onPress={() => completarTarea(item.id)}>
              <Text style={item.completada ? styles.textoCompletado : styles.texto}>
                {item.completada ? "✓ " : "○ "}{item.texto}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => borrarTarea(item.id)}>
              <Text style={styles.borrar}>Borrar</Text>
            </TouchableOpacity>
          </View>
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 24,
    paddingTop: 60,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 24,
  },
  inputContenedor: {
    flexDirection: "row",
    marginBottom: 24,
  },
  input: {
    flex: 1,
    backgroundColor: "#1E1E1E",
    color: "#ffffff",
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  boton: {
    backgroundColor: "#333333",
    paddingHorizontal: 20,
    justifyContent: "center",
    borderRadius: 8,
    marginLeft: 8,
  },
  botonTexto: {
    color: "#ffffff",
    fontSize: 24,
  },
  tarea: {
    backgroundColor: "#1E1E1E",
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  texto: {
    color: "#ffffff",
    fontSize: 16,
  },
  textoCompletado: {
    color: "#555555",
    fontSize: 16,
    textDecorationLine: "line-through",
  },
  borrar: {
    color: "#ff4444",
    fontSize: 14,
  },
});