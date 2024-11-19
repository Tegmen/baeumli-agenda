import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://srhegccxceqeovyojrtm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNyaGVnY2N4Y2VxZW92eW9qcnRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE3OTg0MDksImV4cCI6MjA0NzM3NDQwOX0.HjCwlon-lqdt5RUwfAdPSCAb_nkzoV8_niMeGB6GAwE';

const supabase = createClient(supabaseUrl, supabaseKey);

const Interface = {
  async addTask(password, className, date, subject, shortDesc, longDesc, type) {
    const { data, error } = await supabase.rpc('add_task', {
      p_password: password,
      p_class: className,
      p_date: date,
      p_subject: subject,
      p_short: shortDesc,
      p_long: longDesc,
      p_type: type,
    });
    if (error) throw new Error(error.message);
    return data;
  },

  async createClass(teacherPassword, className, classPassword, isRegular) {
    const { data, error } = await supabase.rpc('create_class', {
      p_password: teacherPassword,
      p_class_name: className,
      p_class_password: classPassword,
      p_is_regular: isRegular,
    });
    if (error) throw new Error(error.message);
    return data;
  },

  async deleteClass(teacherPassword, className) {
    const { data, error } = await supabase.rpc('delete_class', {
      teacher_pw: teacherPassword,
      class_name: className,
    });
    if (error) throw new Error(error.message);
    return data;
  },

  async setClassPassword(teacherPassword, className, classPassword) {
    const { data, error } = await supabase.rpc('set_class_password', {
      teacher_pw: teacherPassword,
      class_name: className,
      class_password: classPassword,
    });
    if (error) throw new Error(error.message);
    return data;
  },

  async deleteTask(password, taskId) {
    const { data, error } = await supabase.rpc('delete_task', {
      p_password: password,
      p_id: taskId,
    });
    if (error) throw new Error(error.message);
    return data;
  },

  async deleteOldTasks(teacherPassword, age) {
    const { data, error } = await supabase.rpc('delete_old_tasks', {
      teacher_pw: teacherPassword,
      age: age,
    });
    if (error) throw new Error(error.message);
    return data;
  },

  async getClassList() {
    const { data, error } = await supabase.rpc('get_class_list');
    if (error) throw new Error(error.message);
    return data.map(item => ({
      className: item.class_name,
      isRegular: item.is_regular,
    }));
  },

  async testClassPassword(className, classPassword) {
    const { data, error } = await supabase.rpc('test_class_password', {
      class_name: className,
      class_password: classPassword,
    });
    if (error) throw new Error(error.message);
    return data;
  },

  async testTeacherPassword(teacherPassword) {
    const { data, error } = await supabase.rpc('test_teacher_password', {
      teacher_pw: teacherPassword,
    });
    if (error) throw new Error(error.message);
    return data;
  },

  async getTasks(className) {
    const { data, error } = await supabase.rpc('get_tasks', {
      class_name: className,
    });
    if (error) throw new Error(error.message);
    return data.map(task => ({
      id: task.id,
      date: task.date,
      subject: task.subject,
      shortDescription: task.short,
      longDescription: task.long,
      type: task.type,
    }));
  },
};

export default Interface;
