#  Documentação da API - BemEstar Softtek NoSQL

Esta documentação descreve as coleções, métodos e operações disponíveis no sistema BemEstar Softtek.

##  **COLEÇÕES**

### 1. **mood_entries**
Registros diários de humor e sentimentos dos funcionários.

#### Estrutura
```javascript
{
  _id: ObjectId,
  employee_id: String,           // Formato: emp_001, emp_002, etc.
  date: Date,                   // Data do registro
  emoji: String,                // 😢, 😄, 😴, 😰, 😨, 😡
  mood: String,                 // Triste, Alegre, Cansado, Ansioso, Medo, Raiva
  feeling: String,              // Motivado, Cansado, Preocupado, Estressado, Animado, Satisfeito
  workload: String,             // Muito Leve, Leve, Média, Alta, Muito Alta
  symptoms: String,             // Não, Raramente, Algumas vezes, Frequentemente, Sempre
  boss_relationship: Number,    // 1-5
  colleagues_relationship: Number, // 1-5
  observations: String,         // Opcional
  created_at: Date,
  updated_at: Date,
  metadata: Object              // Informações de sessão e dispositivo
}
```

#### Métodos
```javascript
// Inserir novo registro
db.mood_entries.insertOne({
  employee_id: "emp_001",
  date: new Date(),
  emoji: "😊",
  mood: "Alegre",
  feeling: "Motivado",
  workload: "Média",
  symptoms: "Raramente",
  boss_relationship: 4,
  colleagues_relationship: 5,
  observations: "Dia produtivo",
  created_at: new Date(),
  updated_at: new Date()
});

// Buscar registros de um funcionário
db.mood_entries.find({
  employee_id: "emp_001"
}).sort({ date: -1 });

// Buscar registros por período
db.mood_entries.find({
  date: {
    $gte: new Date("2024-01-01"),
    $lt: new Date("2024-02-01")
  }
});

// Buscar por humor específico
db.mood_entries.find({
  mood: "Triste",
  date: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
});
```

---

### 2. **assessments**
Avaliações psicossociais completas dos funcionários.

#### Estrutura
```javascript
{
  _id: ObjectId,
  employee_id: String,
  assessment_date: Date,
  emoji_choice: {
    display_name: String,       // Triste, Alegre, Cansado, Ansioso, Medo, Raiva
    emoji: String
  },
  feeling_choice: {
    display_name: String        // Motivado, Cansado, Preocupado, Estressado, Animado, Satisfeito
  },
  workload_level: {
    display_name: String        // Muito Leve, Leve, Média, Alta, Muito Alta
  },
  workload_affects_life: {
    display_name: String        // Não, Raramente, Algumas vezes, Frequentemente, Sempre
  },
  works_overtime: {
    display_name: String        // Não, Raramente, Algumas vezes, Frequentemente, Sempre
  },
  has_symptoms: {
    display_name: String        // Não, Raramente, Algumas vezes, Frequentemente, Sempre
  },
  mental_health_affects_work: {
    display_name: String        // Não, Raramente, Algumas vezes, Frequentemente, Sempre
  },
  relationship_scores: {
    boss: Number,               // 1-5
    colleagues: Number,         // 1-5
    respect_from_colleagues: Number, // 1-5
    team_collaboration: Number, // 1-5
    freedom_to_express: Number, // 1-5
    team_welcoming: Number,     // 1-5
    team_cooperation: Number    // 1-5
  },
  leadership_scores: {
    clear_instructions: Number, // 1-5
    open_communication: Number, // 1-5
    efficient_information: Number, // 1-5
    clear_goals: Number,        // 1-5
    leadership_cares: Number,   // 1-5
    leadership_available: Number, // 1-5
    comfortable_reporting: Number, // 1-5
    recognized_by_leadership: Number, // 1-5
    trust_in_leadership: Number // 1-5
  },
  observations: String,
  assessment_score: Number,     // 0-100 (calculado)
  risk_level: String,          // Baixo, Médio, Alto, Crítico (calculado)
  created_at: Date,
  updated_at: Date
}
```

#### Métodos
```javascript
// Inserir nova avaliação
db.assessments.insertOne({
  employee_id: "emp_001",
  assessment_date: new Date(),
  emoji_choice: {
    display_name: "Alegre",
    emoji: "😄"
  },
  feeling_choice: {
    display_name: "Motivado"
  },
  // ... outros campos
  relationship_scores: {
    boss: 4,
    colleagues: 5,
    respect_from_colleagues: 4,
    team_collaboration: 5,
    freedom_to_express: 4,
    team_welcoming: 5,
    team_cooperation: 4
  },
  leadership_scores: {
    clear_instructions: 4,
    open_communication: 4,
    efficient_information: 3,
    clear_goals: 5,
    leadership_cares: 4,
    leadership_available: 4,
    comfortable_reporting: 4,
    recognized_by_leadership: 3,
    trust_in_leadership: 4
  },
  created_at: new Date(),
  updated_at: new Date()
});

// Buscar avaliações por funcionário
db.assessments.find({
  employee_id: "emp_001"
}).sort({ assessment_date: -1 });

// Buscar avaliações de alto risco
db.assessments.find({
  risk_level: { $in: ["Alto", "Crítico"] }
});

// Calcular pontuação média por departamento
db.assessments.aggregate([
  {
    $lookup: {
      from: "employee_profiles",
      localField: "employee_id",
      foreignField: "employee_id",
      as: "profile"
    }
  },
  {
    $unwind: "$profile"
  },
  {
    $group: {
      _id: "$profile.personal_info.department",
      avg_score: { $avg: "$assessment_score" },
      count: { $sum: 1 }
    }
  }
]);
```

---

### 3. **resources**
Recursos educativos e de apoio para bem-estar.

#### Estrutura
```javascript
{
  _id: ObjectId,
  title: String,                // Título do recurso
  description: String,          // Descrição breve
  category: String,             // Respiração, Exercícios, Mindfulness, etc.
  content: String,              // Conteúdo detalhado
  icon: String,                 // SelfImprovement, FitnessCenter, Psychology, etc.
  color: String,                // Código hexadecimal (#2563eb)
  tags: [String],               // Array de tags
  difficulty_level: String,     // Iniciante, Intermediário, Avançado
  estimated_time_minutes: Number, // Tempo estimado em minutos
  is_active: Boolean,           // Se o recurso está ativo
  priority: Number,             // 1-10
  target_audience: [String],    // Array de audiências
  created_by: String,           // Quem criou
  created_at: Date,
  updated_at: Date,
  last_accessed: Date,
  access_count: Number,         // Contador de acessos
  rating: {
    average: Number,            // 0-5
    count: Number               // Número de avaliações
  },
  metadata: Object
}
```

#### Métodos
```javascript
// Buscar recursos por categoria
db.resources.find({
  category: "Respiração",
  is_active: true
}).sort({ priority: -1 });

// Buscar recursos por dificuldade e tempo
db.resources.find({
  difficulty_level: "Iniciante",
  estimated_time_minutes: { $lte: 15 },
  is_active: true
});

// Buscar recursos mais acessados
db.resources.find({
  is_active: true
}).sort({ access_count: -1 }).limit(10);

// Buscar recursos por tags
db.resources.find({
  tags: { $in: ["ansiedade", "estresse"] },
  is_active: true
});

// Atualizar contador de acesso
db.resources.updateOne(
  { _id: ObjectId("...") },
  { 
    $inc: { access_count: 1 },
    $set: { last_accessed: new Date() }
  }
);
```

---

### 4. **analytics**
Métricas e análises de bem-estar dos funcionários.

#### Estrutura
```javascript
{
  _id: ObjectId,
  employee_id: String,
  report_date: Date,
  report_type: String,          // daily, weekly, monthly, quarterly, yearly, custom
  period: {
    start_date: Date,
    end_date: Date,
    type: String
  },
  mood_analytics: {
    average_mood_score: Number,
    mood_trend: String,         // melhorando, piorando, estável, volátil
    most_common_mood: String,
    mood_consistency: Number,
    mood_volatility: Number
  },
  workload_analytics: {
    average_workload: String,
    workload_trend: String,     // aumentando, diminuindo, estável, irregular
    overtime_frequency: String,
    workload_impact_score: Number
  },
  relationship_analytics: {
    boss_relationship_avg: Number,
    colleagues_relationship_avg: Number,
    team_collaboration_avg: Number,
    leadership_satisfaction_avg: Number
  },
  symptoms_analytics: {
    symptoms_frequency: String,
    symptoms_trend: String,     // aumentando, diminuindo, estável, irregular
    mental_health_impact: String,
    symptoms_severity: Number
  },
  wellness_score: {
    overall_score: Number,      // 0-100
    previous_score: Number,
    score_change: Number,
    score_trend: String         // melhorando, piorando, estável
  },
  risk_assessment: {
    risk_level: String,         // Baixo, Médio, Alto, Crítico
    risk_factors: [String],
    recommendations: [String],
    intervention_needed: Boolean
  },
  recommendations: {
    immediate_actions: [String],
    long_term_goals: [String],
    resources_suggested: [ObjectId],
    professional_help: Boolean
  },
  comparative_data: {
    department_average: Number,
    company_average: Number,
    personal_baseline: Number,
    improvement_percentage: Number
  },
  generated_at: Date,
  metadata: Object
}
```

#### Métodos
```javascript
// Buscar relatórios de um funcionário
db.analytics.find({
  employee_id: "emp_001",
  report_type: "weekly"
}).sort({ report_date: -1 });

// Buscar funcionários com tendência de melhoria
db.analytics.find({
  "wellness_score.score_trend": "melhorando",
  "wellness_score.score_change": { $gt: 5 }
});

// Buscar funcionários de alto risco
db.analytics.find({
  "risk_assessment.risk_level": { $in: ["Alto", "Crítico"] }
});

// Calcular métricas de departamento
db.analytics.aggregate([
  {
    $lookup: {
      from: "employee_profiles",
      localField: "employee_id",
      foreignField: "employee_id",
      as: "profile"
    }
  },
  {
    $unwind: "$profile"
  },
  {
    $group: {
      _id: "$profile.personal_info.department",
      avg_wellness_score: { $avg: "$wellness_score.overall_score" },
      high_risk_count: {
        $sum: {
          $cond: [
            { $in: ["$risk_assessment.risk_level", ["Alto", "Crítico"]] },
            1,
            0
          ]
        }
      }
    }
  }
]);
```

---

### 5. **employee_profiles**
Perfis e informações dos funcionários.

#### Estrutura
```javascript
{
  _id: ObjectId,
  employee_id: String,          // Formato: emp_001, emp_002, etc.
  personal_info: {
    name: String,
    email: String,              // Único
    department: String,         // TI, RH, Financeiro, etc.
    position: String,
    hire_date: Date,
    manager_id: String,
    team_id: String
  },
  wellness_preferences: {
    notification_frequency: String, // Diária, Semanal, Mensal, Nunca
    preferred_categories: [String],
    difficulty_preference: String,  // Iniciante, Intermediário, Avançado, Todos
    time_availability: Number,      // 5-120 minutos
    goals: [String],
    interests: [String]
  },
  app_usage: {
    first_login: Date,
    last_login: Date,
    total_sessions: Number,
    total_time_minutes: Number,
    favorite_resources: [ObjectId],
    completed_assessments: Number,
    mood_entries_count: Number
  },
  wellness_history: {
    baseline_score: Number,
    highest_score: Number,
    lowest_score: Number,
    average_score: Number,
    improvement_trend: String,  // melhorando, piorando, estável, volátil
    last_assessment_date: Date,
    streak_days: Number,
    longest_streak: Number
  },
  risk_profile: {
    current_risk_level: String, // Baixo, Médio, Alto, Crítico
    risk_factors: [String],
    intervention_history: [Object],
    last_intervention: Date,
    intervention_success: Boolean
  },
  privacy_settings: {
    data_sharing: Boolean,
    anonymous_analytics: Boolean,
    manager_visibility: Boolean,
    hr_visibility: Boolean
  },
  created_at: Date,
  updated_at: Date,
  is_active: Boolean,
  metadata: Object
}
```

#### Métodos
```javascript
// Buscar perfil de funcionário
db.employee_profiles.findOne({
  employee_id: "emp_001"
});

// Buscar funcionários por departamento
db.employee_profiles.find({
  "personal_info.department": "TI",
  is_active: true
});

// Buscar funcionários de alto risco
db.employee_profiles.find({
  "risk_profile.current_risk_level": { $in: ["Alto", "Crítico"] },
  is_active: true
});

// Buscar funcionários inativos
db.employee_profiles.find({
  is_active: true,
  "app_usage.last_login": {
    $lt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  }
});

// Atualizar último login
db.employee_profiles.updateOne(
  { employee_id: "emp_001" },
  { 
    $set: { 
      "app_usage.last_login": new Date(),
      updated_at: new Date()
    },
    $inc: { "app_usage.total_sessions": 1 }
  }
);
```

---

### 6. **notifications**
Sistema de notificações e lembretes.

#### Estrutura
```javascript
{
  _id: ObjectId,
  employee_id: String,
  notification_id: String,      // Único por funcionário
  type: String,                 // reminder, assessment, resource, achievement, warning, info, urgent
  title: String,
  message: String,
  priority: String,             // low, medium, high, urgent
  category: String,             // wellness, assessment, resource, achievement, system, safety, reminder
  status: String,               // pending, scheduled, sent, delivered, read, failed, expired, cancelled
  scheduled_for: Date,
  sent_at: Date,
  read_at: Date,
  action_required: Boolean,
  action_url: String,
  action_button_text: String,
  expires_at: Date,
  created_at: Date,
  updated_at: Date,
  metadata: Object
}
```

#### Métodos
```javascript
// Buscar notificações de um funcionário
db.notifications.find({
  employee_id: "emp_001"
}).sort({ created_at: -1 });

// Buscar notificações pendentes
db.notifications.find({
  employee_id: "emp_001",
  status: { $in: ["pending", "scheduled"] },
  expires_at: { $gt: new Date() }
});

// Buscar notificações não lidas
db.notifications.find({
  employee_id: "emp_001",
  status: "sent",
  read_at: { $exists: false }
});

// Marcar notificação como lida
db.notifications.updateOne(
  { _id: ObjectId("...") },
  { 
    $set: { 
      status: "read",
      read_at: new Date(),
      updated_at: new Date()
    }
  }
);

// Criar notificação de lembrete
db.notifications.insertOne({
  employee_id: "emp_001",
  type: "reminder",
  title: "Lembrete de Avaliação Diária",
  message: "Que tal registrar como está se sentindo hoje?",
  priority: "medium",
  category: "assessment",
  status: "pending",
  scheduled_for: new Date(),
  action_required: true,
  action_url: "/assessment",
  action_button_text: "Fazer Avaliação",
  expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000),
  created_at: new Date(),
  updated_at: new Date()
});
```

---

##  **FUNÇÕES DE UTILIDADE**

### Calcular Pontuação de Bem-estar
```javascript
// Função disponível no MongoDB
calculateWellnessScore(relationshipScores, leadershipScores, workloadImpact, symptomsImpact)

// Exemplo de uso
const relationshipScores = [4, 5, 4, 5, 4, 5, 4];
const leadershipScores = [4, 4, 3, 5, 4, 4, 4, 3, 4];
const workloadImpact = 2;
const symptomsImpact = 1;

const score = calculateWellnessScore(relationshipScores, leadershipScores, workloadImpact, symptomsImpact);
// Retorna: 78
```

### Determinar Nível de Risco
```javascript
// Função disponível no MongoDB
calculateRiskLevel(wellnessScore, symptomsFrequency)

// Exemplo de uso
const riskLevel = calculateRiskLevel(78, "Raramente");
// Retorna: "Baixo"
```

---

##  **ÍNDICES OTIMIZADOS**

### mood_entries
- `{ employee_id: 1, date: -1 }` (único)
- `{ date: -1 }`
- `{ employee_id: 1, created_at: -1 }`
- `{ mood: 1, date: -1 }`

### assessments
- `{ employee_id: 1, assessment_date: -1 }` (único)
- `{ assessment_date: -1 }`
- `{ risk_level: 1, assessment_date: -1 }`
- `{ assessment_score: -1 }`

### resources
- `{ category: 1, priority: -1 }`
- `{ is_active: 1, priority: -1 }`
- `{ tags: 1 }`
- `{ access_count: -1 }`

### analytics
- `{ employee_id: 1, report_date: -1 }`
- `{ report_type: 1, report_date: -1 }`
- `{ risk_assessment.risk_level: 1, report_date: -1 }`
- `{ wellness_score.overall_score: -1 }`

### employee_profiles
- `{ employee_id: 1 }` (único)
- `{ personal_info.email: 1 }` (único)
- `{ personal_info.department: 1, is_active: 1 }`
- `{ risk_profile.current_risk_level: 1, is_active: 1 }`

### notifications
- `{ employee_id: 1, status: 1, created_at: -1 }`
- `{ type: 1, priority: 1, scheduled_for: 1 }`
- `{ status: 1, scheduled_for: 1 }`
- `{ expires_at: 1 }`

---

## **EXEMPLOS DE CONSULTAS COMPLEXAS**

### Dashboard Executivo
```javascript
// Métricas gerais da empresa
db.analytics.aggregate([
  {
    $match: {
      report_type: "monthly",
      report_date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
    }
  },
  {
    $group: {
      _id: null,
      total_employees: { $sum: 1 },
      avg_wellness_score: { $avg: "$wellness_score.overall_score" },
      high_risk_count: {
        $sum: {
          $cond: [
            { $in: ["$risk_assessment.risk_level", ["Alto", "Crítico"]] },
            1,
            0
          ]
        }
      }
    }
  }
]);
```

### Análise de Tendências
```javascript
// Tendências de humor por período
db.mood_entries.aggregate([
  {
    $match: {
      date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
    }
  },
  {
    $group: {
      _id: {
        week: { $week: "$date" },
        mood: "$mood"
      },
      count: { $sum: 1 }
    }
  },
  {
    $group: {
      _id: "$_id.week",
      moods: {
        $push: {
          mood: "$_id.mood",
          count: "$count"
        }
      },
      total: { $sum: "$count" }
    }
  },
  {
    $sort: { "_id": 1 }
  }
]);
```

### Recomendações Personalizadas
```javascript
// Buscar recursos recomendados para um funcionário
db.employee_profiles.aggregate([
  {
    $match: { employee_id: "emp_001" }
  },
  {
    $lookup: {
      from: "resources",
      let: { 
        interests: "$wellness_preferences.interests",
        categories: "$wellness_preferences.preferred_categories"
      },
      pipeline: [
        {
          $match: {
            $expr: {
              $and: [
                { $eq: ["$is_active", true] },
                {
                  $or: [
                    { $in: ["$category", "$$categories"] },
                    { $in: ["$tags", "$$interests"] }
                  ]
                }
              ]
            }
          }
        }
      ],
      as: "recommended_resources"
    }
  }
]);
```

---

##  **VALIDAÇÃO DE DADOS**

Todas as coleções possuem validação rigorosa usando `$jsonSchema`:

- **Tipos de dados** corretos
- **Valores obrigatórios** definidos
- **Enums** para valores permitidos
- **Padrões regex** para formatos específicos
- **Limites mínimos/máximos** para números
- **Tamanhos** para strings

---

##  **MONITORAMENTO E PERFORMANCE**

### Métricas Importantes
- Tempo de resposta das consultas
- Uso de índices
- Tamanho das coleções
- Taxa de cache hit

### Consultas de Monitoramento
```javascript
// Verificar estatísticas de uma coleção
db.mood_entries.stats();

// Verificar uso de índices
db.mood_entries.aggregate([{ $indexStats: {} }]);

// Verificar consultas lentas
db.setProfilingLevel(2, { slowms: 100 });
db.system.profile.find().sort({ ts: -1 }).limit(5);
```
