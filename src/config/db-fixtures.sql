INSERT INTO teachers (
      avatar_url,
      name,
      birth_date,
      education_level,
      class_type,
      subjects_taught,
      created_at
    ) VALUES  ('http://', 'Paty', '2000-05-02','Nível Médio', 'Online', 'Matemática', '2005-05-02')
    RETURNING id

