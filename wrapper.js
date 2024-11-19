// wrapper.js
import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = 'https://srhegccxceqeovyojrtm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNyaGVnY2N4Y2VxZW92eW9qcnRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE3OTg0MDksImV4cCI6MjA0NzM3NDQwOX0.HjCwlon-lqdt5RUwfAdPSCAb_nkzoV8_niMeGB6GAwE';

// Singleton Supabase client
let supabase = createClient(supabaseUrl, supabaseKey);

const Wrapper = {
  async getTasks(className) {
    const { data, error } = await supabase.rpc('get_tasks', { class_name: className });
    if (error) {
      console.error('Error fetching tasks:', error);
      return [];
    }
    return data;
  },

  async addTask(password, className, date, subject, shortText, longText, type) {
    const { data, error } = await supabase.rpc('add_task', {
      p_password: password,
      p_class: className,
      p_date: date,
      p_subject: subject,
      p_short: shortText,
      p_long: longText,
      p_type: type,
    });
    if (error) {
      console.error('Error adding task:', error);
      return error.message;
    }
    return data;
  },

  async createClass(password, className, classPassword, isRegular = true) {
    const { data, error } = await supabase.rpc('create_class', {
      p_password: password,
      p_class_name: className,
      p_class_password: classPassword,
      p_is_regular: isRegular,
    });
    if (error) {
      console.error('Error creating class:', error);
      return error.message;
    }
    return data;
  },

  async deleteClass(teacherPassword, className) {
    const { data, error } = await supabase.rpc('delete_class', {
      teacher_pw: teacherPassword,
      class_name: className,
    });
    if (error) {
      console.error('Error deleting class:', error);
      return error.message;
    }
    return data;
  },

  async setClassPassword(teacherPassword, className, classPassword) {
    const { data, error } = await supabase.rpc('set_class_password', {
      teacher_pw: teacherPassword,
      class_name: className,
      class_password: classPassword,
    });
    if (error) {
      console.error('Error updating class password:', error);
      return error.message;
    }
    return data;
  },

  async deleteTask(password, taskId) {
    const { data, error } = await supabase.rpc('delete_task', {
      p_password: password,
      p_id: taskId,
    });
    if (error) {
      console.error('Error deleting task:', error);
      return error.message;
    }
    return data;
  },

  async deleteOldTasks(teacherPassword, age) {
    const { data, error } = await supabase.rpc('delete_old_tasks', {
      teacher_pw: teacherPassword,
      age: age,
    });
    if (error) {
      console.error('Error deleting old tasks:', error);
      return error.message;
    }
    return data;
  },

  async getClassList() {
    const { data, error } = await supabase.rpc('get_class_list');
    if (error) {
      console.error('Error fetching class list:', error);
      return [];
    }
    return data;
  },

  async testClassPassword(className, classPassword) {
    const { data, error } = await supabase.rpc('test_class_password', {
      class_name: className,
      class_password: classPassword,
    });
    if (error) {
      console.error('Error testing class password:', error);
      return false;
    }
    return data;
  },

  async testTeacherPassword(teacherPassword) {
    const { data, error } = await supabase.rpc('test_teacher_password', {
      teacher_pw: teacherPassword,
    });
    if (error) {
      console.error('Error testing teacher password:', error);
      return false;
    }
    return data;
  },
};

export default Wrapper;
