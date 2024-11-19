import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabaseUrl = 'https://srhegccxceqeovyojrtm.supabase.co';
const supabaseKey = 'YOUR_SUPABASE_KEY'; // Replace with your actual key

const supabase = createClient(supabaseUrl, supabaseKey);

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
};

export default Wrapper;
