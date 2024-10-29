import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import { config } from './config';

const supabase = createClient(
  config.supabase.url!,
  config.supabase.anonKey!
);
const supabaseTable = config.supabase.table!;
const app = express();

app.use(express.json());
app.use(cors());

app.post('/api/subscribe', async (req, res) => {
  try {
    const { email } = req.body;
    
    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // Check if email already exists
    const { data: existingSubscriber } = await supabase
      .from(supabaseTable)
      .select()
      .eq('email', email)
      .single();

    if (existingSubscriber) {
      return res.status(409).json({ error: 'Email already subscribed' });
    }

    // Create new subscriber
    const { data: subscriber, error } = await supabase
      .from(supabaseTable)
      .insert([{ email }])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({ message: 'Successfully subscribed', subscriber });
  } catch (error) {
    console.error('Subscription error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 