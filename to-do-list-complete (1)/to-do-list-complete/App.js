import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet,Switch, Picker } from 'react-native';

const TodoApp = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [taskCategory, setTaskCategory] = useState('study');
  const [taskTitle, setTaskTitle] = useState('');
  
  const addTask = () => {
  if (task.trim() !== '') {
    setTasks([...tasks, { id: Date.now().toString(), text: task, completed:     false, category: 'Tất cả' }]);
    setTask('');
  }
};

  const removeTask = (taskId) => {
    const updatedTasks = tasks.filter((t) => t.id !== taskId);
    setTasks(updatedTasks);
  };

  const toggleCompletion = (taskId) => {
  setTasks((prevTasks) =>
    prevTasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    )
  );
};


  return (
    <View style={styles.container}>
      <Text style={styles.header}>To-Do List</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nhập tên công việc"
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.buttonText}>Thêm</Text>
        </TouchableOpacity>
      </View>

     

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm công việc"
          value={searchTerm}
          onChangeText={(text) => setSearchTerm(text)}
        />
        <Picker
              style={styles.type}
              selectedValue={taskCategory}
              onValueChange={(itemValue, itemIndex) => setTaskCategory(itemValue)}
            >
              <Picker.Item label="Học" value="study" />
              <Picker.Item label="Chơi" value="play" />
              <Picker.Item label="Việc nhà" value="housework" />
              <Picker.Item label="Bài tập" value="homework" />
              <Picker.Item label="Bạn bè" value="friend" />
        </Picker> 
      </View>


      <FlatList
        data={tasks.filter((item) => item.text.includes(searchTerm))}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <Switch
              value={item.completed}
              onValueChange={() => toggleCompletion(item.id)}
              style={styles.toggle}
            />

            <Text style={[styles.taskText, item.completed && styles.completedTaskText]}>
              {item.text}
            </Text>
            
            <TouchableOpacity onPress={() => removeTask(item.id)}>
              <Text style={styles.deleteButton}>Xóa</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    borderWidth:2,
    borderRadius:5,
    borderColor:'#FF004D',
    backgroundColor:'#1D2B53',
  },
  header: {
    fontSize: 50,
    marginTop: 30,
    color:'#FFF024',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  searchContainer: {
  marginTop: 10,
  marginBottom: 10,
},
searchInput: {
  height: 40,
  color:'#FFF024',
  borderColor: 'gray',
  borderWidth: 2,
  borderRadius: 5,
  paddingLeft: 10,
},
  input: {
    flex: 1,
    height: 40,
    color:'#FFF024',
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 5,
    marginTop: 40,
    marginRight: 10,
    paddingLeft: 10,
  },
  addButton: {
    backgroundColor: '#7E2553',
    padding: 10,
    borderRadius: 5,
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF024',
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth:2,
    borderRadius:5,
    height:40,
    borderColor:'#29ADB2',
    backgroundColor:'#252A34',
  },
  taskText: {
    fontSize: 16,
    paddingLeft:10,
    color:'#FFF024',
  },
  completedTaskText: {
    textDecorationLine: 'line-through',
    color: '#EEEDED',
  },
  deleteButton: {
    color: '#FF004D',
    fontSize:20,
    paddingRight:10,
    marginRight:10,
  },
  toggle:{
    marginLeft:10,
  },
  type:{
    marginTop:20,
    borderWidth:2,
    borderRadius:5,
    height:40,
  }
});

export default TodoApp;
