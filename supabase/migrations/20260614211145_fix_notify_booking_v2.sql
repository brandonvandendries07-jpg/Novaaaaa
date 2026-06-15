-- Drop the old trigger and function
DROP TRIGGER IF EXISTS on_new_booking ON bookings;
DROP FUNCTION IF EXISTS notify_new_booking();

-- Create the function using pg_net with correct schema
CREATE OR REPLACE FUNCTION notify_new_booking()
RETURNS TRIGGER AS $$
DECLARE
  response jsonb;
BEGIN
  SELECT net.http_post(
    'https://dnxbpftmzszgvbapcvlz.supabase.co/functions/v1/send-booking-email',
    '{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRueGJwZnRtenN6Z3ZiYXBjdmx6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzOTQ3NTEsImV4cCI6MjA2OTk3MDc1MX0.vOAQn1n7r4mG4h2n8ZVX9yKqJzMwzN1s2VFqR0kPwQ8"}'::jsonb,
    json_build_object('booking', json_build_object(
      'id', NEW.id,
      'first_name', NEW.first_name,
      'last_name', NEW.last_name,
      'phone', NEW.phone,
      'email', NEW.email,
      'address', NEW.address,
      'vehicle_type', NEW.vehicle_type,
      'service', NEW.service,
      'preferred_date', NEW.preferred_date,
      'comment', NEW.comment,
      'status', NEW.status
    ))::text,
    5000
  ) INTO response;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = extensions, public;

-- Create the trigger
CREATE TRIGGER on_new_booking
  AFTER INSERT ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION notify_new_booking();