import { createClient } from '@supabase/supabase-js';

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
      return 'Error adding task.';
    }
    return 'Task successfully added.';
  },
};

export default Wrapper;
