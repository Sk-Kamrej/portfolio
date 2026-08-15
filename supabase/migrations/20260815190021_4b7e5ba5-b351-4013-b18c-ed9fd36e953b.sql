
-- roles
CREATE TYPE public.app_role AS ENUM ('admin','user');
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "own roles readable" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "admins manage roles" ON public.user_roles FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE OR REPLACE FUNCTION public.set_updated_at() RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- profile (singleton)
CREATE TABLE public.profile (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT '',
  headline text NOT NULL DEFAULT '',
  descriptor text NOT NULL DEFAULT '',
  tagline text NOT NULL DEFAULT '',
  philosophy text NOT NULL DEFAULT '',
  bio text NOT NULL DEFAULT '',
  hero_intro text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  github_url text NOT NULL DEFAULT '',
  github_username text NOT NULL DEFAULT '',
  linkedin_url text NOT NULL DEFAULT '',
  photo_url text,
  college text NOT NULL DEFAULT '',
  university text NOT NULL DEFAULT '',
  research_interests text[] NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.academic_profile (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cgpa numeric(4,2),
  cgpa_scale numeric(4,2) NOT NULL DEFAULT 10,
  degree text NOT NULL DEFAULT '',
  institution text NOT NULL DEFAULT '',
  university text NOT NULL DEFAULT '',
  current_semester text,
  note text,
  updated_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.academic_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  semester integer NOT NULL,
  sgpa numeric(4,2),
  credits numeric(6,2),
  cgpa numeric(4,2),
  academic_year text,
  notes text,
  published boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.education (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  degree text NOT NULL,
  institution text NOT NULL DEFAULT '',
  university text,
  start_date text,
  end_date text,
  is_current boolean NOT NULL DEFAULT false,
  description text,
  coursework text[] NOT NULL DEFAULT '{}',
  achievements text[] NOT NULL DEFAULT '{}',
  published boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.current_status (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  emoji text NOT NULL DEFAULT '',
  label text NOT NULL,
  published boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.journey (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  year text NOT NULL,
  title text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT 'Education',
  technologies text[] NOT NULL DEFAULT '{}',
  link_url text,
  image_url text,
  featured boolean NOT NULL DEFAULT false,
  published boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  short_description text NOT NULL DEFAULT '',
  description text,
  problem text,
  solution text,
  architecture text,
  challenges text,
  learned text[] NOT NULL DEFAULT '{}',
  features text[] NOT NULL DEFAULT '{}',
  technologies text[] NOT NULL DEFAULT '{}',
  category text,
  status text NOT NULL DEFAULT 'Building',
  start_date text,
  end_date text,
  github_url text,
  live_url text,
  docs_url text,
  screenshots text[] NOT NULL DEFAULT '{}',
  demo_video_url text,
  featured boolean NOT NULL DEFAULT false,
  published boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.research (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  area text,
  description text,
  problem text,
  methodology text,
  dataset text,
  technologies text[] NOT NULL DEFAULT '{}',
  results text,
  status text NOT NULL DEFAULT 'Exploring',
  publication text,
  paper_url text,
  github_url text,
  date text,
  published boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.experience (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  position text NOT NULL,
  organization text NOT NULL DEFAULT '',
  employment_type text,
  start_date text,
  end_date text,
  is_current boolean NOT NULL DEFAULT false,
  description text,
  responsibilities text[] NOT NULL DEFAULT '{}',
  technologies text[] NOT NULL DEFAULT '{}',
  projects_worked_on text[] NOT NULL DEFAULT '{}',
  skills_gained text[] NOT NULL DEFAULT '{}',
  certificate_url text,
  organization_url text,
  published boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL,
  name text NOT NULL,
  state text NOT NULL DEFAULT 'Learning',
  published boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.certifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  organization text NOT NULL DEFAULT '',
  issue_date text,
  expiration_date text,
  credential_id text,
  credential_url text,
  image_url text,
  pdf_url text,
  skills text[] NOT NULL DEFAULT '{}',
  description text,
  published boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  organization text,
  date text,
  description text,
  link_url text,
  published boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  description text,
  content text,
  cover_image_url text,
  tags text[] NOT NULL DEFAULT '{}',
  published_at text,
  published boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.resumes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  label text NOT NULL DEFAULT 'Resume',
  version integer NOT NULL DEFAULT 1,
  file_path text NOT NULL,
  file_url text NOT NULL,
  is_active boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.social_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  label text NOT NULL,
  url text NOT NULL,
  icon text NOT NULL DEFAULT 'link',
  published boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text NOT NULL UNIQUE,
  value text,
  updated_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text,
  message text NOT NULL,
  is_read boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- grants + rls + policies
DO $$
DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY['profile','academic_profile','academic_records','education','current_status','journey','projects','research','experience','skills','certifications','achievements','blog_posts','resumes','social_links','site_settings']
  LOOP
    EXECUTE format('GRANT SELECT ON public.%I TO anon;', t);
    EXECUTE format('GRANT SELECT, INSERT, UPDATE, DELETE ON public.%I TO authenticated;', t);
    EXECUTE format('GRANT ALL ON public.%I TO service_role;', t);
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY;', t);
    EXECUTE format('CREATE POLICY "admins manage %1$s" ON public.%1$I FOR ALL TO authenticated USING (public.has_role(auth.uid(),''admin'')) WITH CHECK (public.has_role(auth.uid(),''admin''));', t);
    EXECUTE format('CREATE TRIGGER set_%1$s_updated_at BEFORE UPDATE ON public.%1$I FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();', t);
  END LOOP;

  -- public read for tables with a published flag
  FOREACH t IN ARRAY ARRAY['academic_records','education','current_status','journey','projects','research','experience','skills','certifications','achievements','blog_posts','social_links']
  LOOP
    EXECUTE format('CREATE POLICY "public read %1$s" ON public.%1$I FOR SELECT TO anon, authenticated USING (published = true);', t);
  END LOOP;

  FOREACH t IN ARRAY ARRAY['profile','academic_profile','site_settings']
  LOOP
    EXECUTE format('CREATE POLICY "public read %1$s" ON public.%1$I FOR SELECT TO anon, authenticated USING (true);', t);
  END LOOP;
END $$;

CREATE POLICY "public read active resume" ON public.resumes FOR SELECT TO anon, authenticated USING (is_active = true);

GRANT INSERT ON public.contact_messages TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.contact_messages TO authenticated;
GRANT ALL ON public.contact_messages TO service_role;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone can send a message" ON public.contact_messages FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "admins read messages" ON public.contact_messages FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "admins update messages" ON public.contact_messages FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "admins delete messages" ON public.contact_messages FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));

-- storage object policies (buckets created separately)
CREATE POLICY "public read resumes" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id in ('resumes','portfolio'));
CREATE POLICY "admins write resumes" ON storage.objects FOR ALL TO authenticated
  USING (bucket_id in ('resumes','portfolio') AND public.has_role(auth.uid(),'admin'))
  WITH CHECK (bucket_id in ('resumes','portfolio') AND public.has_role(auth.uid(),'admin'));

-- seed real content
INSERT INTO public.profile (name, headline, descriptor, tagline, philosophy, bio, hero_intro, email, github_url, github_username, linkedin_url, college, university, research_interests) VALUES (
 'SK KAMREJ',
 'BCA Honours with Research Student',
 'Software Developer • AI/ML Enthusiast • Researcher',
 'Building. Learning. Researching. Growing.',
 'I learn best by building.',
 'I am currently pursuing BCA Honours with Research at Panskura Banamali College under Vidyasagar University. I am interested in software development, AI/ML, research, and solving real-world problems through technology. I prefer learning through practical work and building actual projects rather than only studying theory. I am exploring how technology, machine learning, and software systems can be used to solve meaningful problems.',
 'I''m a BCA Honours with Research student interested in software development, artificial intelligence, machine learning, and research. I learn by building practical projects, experimenting with technology, and exploring real-world problems.',
 'skkamrej786@gmail.com',
 'https://github.com/Sk-Kamrej',
 'Sk-Kamrej',
 'https://www.linkedin.com/in/sk-kamrej-740031313/',
 'Panskura Banamali College',
 'Vidyasagar University',
 ARRAY['Machine Learning','Explainable AI','Applied AI','Data-driven systems','Real-world problem solving','Human-centered technology']
);

INSERT INTO public.academic_profile (cgpa, cgpa_scale, degree, institution, university, current_semester)
VALUES (8.27, 10, 'BCA Honours with Research', 'Panskura Banamali College', 'Vidyasagar University', NULL);

INSERT INTO public.education (degree, institution, university, start_date, is_current, sort_order)
VALUES ('BCA Honours with Research', 'Panskura Banamali College', 'Vidyasagar University', '2023', true, 0);

INSERT INTO public.current_status (emoji, label, sort_order) VALUES
 ('🎓','BCA Honours with Research',0),
 ('💻','Building software projects',1),
 ('🤖','Exploring AI/ML',2),
 ('🔬','Exploring research',3),
 ('📚','Continuously learning',4);

INSERT INTO public.social_links (label, url, icon, sort_order) VALUES
 ('GitHub','https://github.com/Sk-Kamrej','github',0),
 ('LinkedIn','https://www.linkedin.com/in/sk-kamrej-740031313/','linkedin',1),
 ('Email','mailto:skkamrej786@gmail.com','mail',2);

INSERT INTO public.journey (year, title, description, category, sort_order) VALUES
 ('2023','Started my BCA journey','Started my BCA journey and began exploring programming and computer applications.','Education',0),
 ('2024','Expanding technical foundations','Expanded my knowledge of programming, databases, web development, and software technologies.','Development',1),
 ('2025','Exploring AI & Machine Learning','Started exploring Artificial Intelligence, Machine Learning, data-driven problem solving, and practical projects.','AI/ML',2),
 ('2026','BCA Honours with Research','Building projects, exploring AI/ML, working on research-oriented projects, internships, and documenting my growth.','Research',3),
 ('Future','MCA → Advanced Research → Professional Development','Continuing towards advanced study, research, and a career combining technology, development and research.','Career',4);

INSERT INTO public.projects (slug, name, short_description, description, problem, solution, architecture, features, technologies, category, status, featured, sort_order) VALUES
 ('smartattendify','SmartAttendify',
  'A modern college attendance management platform designed to make attendance tracking more practical and scalable, with a mobile-first and API-first architecture for future expansion.',
  'SmartAttendify is being built as an API-first system so the same backend can later power a web dashboard and a mobile app without rewrites.',
  'Attendance in colleges is still handled through paper registers and scattered spreadsheets, which makes records hard to verify, slow to compile and difficult to analyse.',
  'A single platform where attendance is captured quickly on a phone, stored through a clean API layer, and surfaced back as readable summaries for students, faculty and administration.',
  'React front-end talking to a Node.js REST API, with token-based authentication and a relational database schema modelling users, subjects, sessions and attendance entries.',
  ARRAY['Mobile-first attendance capture flow','Role-based access for students, faculty and admin','Session and subject wise attendance records','Summary views and shortage indicators','API layer prepared for a future mobile client'],
  ARRAY['React','Node.js','REST API','Database','Authentication'],
  'Full-stack','Building', true, 0),
 ('caesarean-section-prediction','Caesarean Section Prediction Using Machine Learning with DALEX Explainability',
  'A machine learning research project focused on predicting Caesarean section outcomes using machine learning together with explainability techniques.',
  'A study-oriented project exploring model performance alongside interpretability, rather than optimising accuracy alone.',
  'Clinical prediction models are often accurate but opaque, which limits how much practitioners can trust or interrogate their output.',
  'Pair gradient boosting models with explainability tooling so predictions can be traced back to the features that drove them.',
  'A Python workflow: preprocessing, model training with LightGBM, evaluation, then explanation layers with SHAP and DALEX.',
  ARRAY['Data cleaning and feature preparation','Model training and comparison','Evaluation beyond accuracy','SHAP and DALEX based explanations','Visual reporting of feature influence'],
  ARRAY['Python','Machine Learning','LightGBM','SHAP','DALEX','Data Analysis'],
  'AI / Machine Learning','Research', true, 1);

INSERT INTO public.skills (category, name, state, sort_order) VALUES
 ('Programming','C','Working With',0),('Programming','C++','Working With',1),('Programming','Java','Learning',2),('Programming','Python','Working With',3),('Programming','JavaScript','Working With',4),
 ('Web Development','HTML','Working With',0),('Web Development','CSS','Working With',1),('Web Development','React','Learning',2),
 ('Backend','Node.js','Learning',0),('Backend','REST APIs','Learning',1),
 ('Database','MySQL','Working With',0),('Database','Oracle SQL','Learning',1),('Database','PostgreSQL','Exploring',2),
 ('AI / Machine Learning','Machine Learning','Learning',0),('AI / Machine Learning','Data Analysis','Learning',1),('AI / Machine Learning','Explainable AI','Exploring',2),('AI / Machine Learning','Model Evaluation','Learning',3),('AI / Machine Learning','Data Visualization','Learning',4),
 ('Tools','Git','Working With',0),('Tools','GitHub','Working With',1),('Tools','VS Code','Working With',2),('Tools','Linux','Learning',3),('Tools','Figma','Exploring',4),
 ('Research','Research Methodology','Learning',0),('Research','LaTeX','Learning',1),('Research','Technical Writing','Learning',2);
