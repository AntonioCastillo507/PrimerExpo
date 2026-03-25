import { useState } from "react";
import {
  Alert,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
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
      {
        id: Date.now().toString(),
        texto: nuevaTarea.trim(),
        completada: false,
      },
    ]);
    setNuevaTarea("");
  };

  const toggleTarea = (id: string) => {
    setTareas(
      tareas.map((t) =>
        t.id === id ? { ...t, completada: !t.completada } : t,
      ),
    );
  };

  const borrarTarea = (id: string) => {
    Alert.alert("Borrar tarea", "¿Estás seguro?", [
      { text: "Cancelar" },
      {
        text: "Borrar",
        onPress: () => setTareas(tareas.filter((t) => t.id !== id)),
      },
    ]);
  };

  const pendientes = tareas.filter((t) => !t.completada).length;

  return (
    <View style={styles.contenedor}>
      <StatusBar barStyle="light-content" backgroundColor="#6C63FF" />
      <View style={styles.encabezado}>
        <Text style={styles.titulo}>Mis Tareas</Text>
        <Text style={styles.subtitulo}>{pendientes} tarea(s) pendiente(s)</Text>
      </View>
      <View style={styles.inputContenedor}>
        <TextInput
          style={styles.input}
          placeholder="Escribe una nueva tarea..."
          placeholderTextColor="#aaa"
          value={nuevaTarea}
          onChangeText={setNuevaTarea}
          onSubmitEditing={agregarTarea}
        />
        <TouchableOpacity style={styles.botonAgregar} onPress={agregarTarea}>
          <Text style={styles.botonAgregarTexto}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={tareas}
        keyExtractor={(item) => item.id}
        style={styles.lista}
        ListEmptyComponent={
          <Text style={styles.listaVacia}>¡No hay tareas pendientes!</Text>
        }
        renderItem={({ item }) => (
          <View
            style={[styles.tarea, item.completada && styles.tareaCompletada]}
          >
            <TouchableOpacity
              style={styles.tareaIzquierda}
              onPress={() => toggleTarea(item.id)}
            >
              <View
                style={[styles.circulo, item.completada && styles.circuloCheck]}
              >
                {item.completada && <Text style={styles.check}>✓</Text>}
              </View>
              <Text
                style={[
                  styles.tareaTexto,
                  item.completada && styles.tareaTextoTachado,
                ]}
              >
                {item.texto}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => borrarTarea(item.id)}>
              <Text style={styles.botonBorrar}>🗑️</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: "#F0F0F7" },
  encabezado: {
    backgroundColor: "#6C63FF",
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 24,
  },
  titulo: { fontSize: 32, fontWeight: "bold", color: "#fff" },
  subtitulo: { fontSize: 16, color: "#D1CEFF", marginTop: 4 },
  inputContenedor: {
    flexDirection: "row",
    margin: 16,
    backgroundColor: "#fff",
    borderRadius: 16,
    elevation: 4,
    overflow: "hidden",
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#333",
  },
  botonAgregar: {
    backgroundColor: "#6C63FF",
    width: 56,
    justifyContent: "center",
    alignItems: "center",
  },
  botonAgregarTexto: { color: "#fff", fontSize: 30, fontWeight: "bold" },
  lista: { paddingHorizontal: 16 },
  listaVacia: {
    textAlign: "center",
    color: "#aaa",
    fontSize: 18,
    marginTop: 60,
  },
  tarea: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
    elevation: 2,
    justifyContent: "space-between",
  },
  tareaCompletada: { backgroundColor: "#E8E8F0", opacity: 0.7 },
  tareaIzquierda: { flexDirection: "row", alignItems: "center", flex: 1 },
  circulo: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: "#6C63FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  circuloCheck: { backgroundColor: "#6C63FF" },
  check: { color: "#fff", fontWeight: "bold", fontSize: 14 },
  tareaTexto: { fontSize: 16, color: "#333", flex: 1 },
  tareaTextoTachado: { textDecorationLine: "line-through", color: "#aaa" },
  botonBorrar: { fontSize: 20, paddingLeft: 8 },
});
