import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// Supabase configuration
const supabaseUrl = 'https://srhegccxceqeovyojrtm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNyaGVnY2N4Y2VxZW92eW9qcnRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE3OTg0MDksImV4cCI6MjA0NzM3NDQwOX0.HjCwlon-lqdt5RUwfAdPSCAb_nkzoV8_niMeGB6GAwE';

const supabase = createClient(supabaseUrl, supabaseKey);

const Wrapper = {
  async getTasks(className) {
  const { data, error } = await supabase.rpc('get_tasks', { class_name: className });
  if (error) {
    console.error('Error fetching tasks:', error);
    return [];
  }
  console.log('Supabase data:', data); // Debugging
  return data;
}
,

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
