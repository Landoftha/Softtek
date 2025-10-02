// Script para criar as coleções no MongoDB
// Execute: mongo bemestar_softtek setup_mongodb.js

use bemestar_softtek;

print(" Iniciando configuração do banco de dados BemEstar Softtek...");


// Coleção mood_entries
db.createCollection("mood_entries", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["employee_id", "date", "emoji", "mood", "feeling", "workload", "symptoms", "boss_relationship", "colleagues_relationship", "created_at", "updated_at"],
      properties: {
        employee_id: {
          bsonType: "string",
          minLength: 1,
          maxLength: 50,
          pattern: "^emp_[0-9]{3,6}$"
        },
        date: { bsonType: "date" },
        emoji: {
          bsonType: "string",
          enum: ["😢", "😄", "😴", "😰", "😨", "😡"]
        },
        mood: {
          bsonType: "string",
          enum: ["Triste", "Alegre", "Cansado", "Ansioso", "Medo", "Raiva"]
        },
        feeling: {
          bsonType: "string",
          enum: ["Motivado", "Cansado", "Preocupado", "Estressado", "Animado", "Satisfeito"]
        },
        workload: {
          bsonType: "string",
          enum: ["Muito Leve", "Leve", "Média", "Alta", "Muito Alta"]
        },
        symptoms: {
          bsonType: "string",
          enum: ["Não", "Raramente", "Algumas vezes", "Frequentemente", "Sempre"]
        },
        boss_relationship: {
          bsonType: "number",
          minimum: 1,
          maximum: 5
        },
        colleagues_relationship: {
          bsonType: "number",
          minimum: 1,
          maximum: 5
        },
        observations: { bsonType: "string" },
        created_at: { bsonType: "date" },
        updated_at: { bsonType: "date" }
      }
    }
  }
});

print(" Coleção mood_entries criada");

// Coleção assessments
db.createCollection("assessments", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["employee_id", "assessment_date", "emoji_choice", "feeling_choice", "workload_level", "workload_affects_life", "works_overtime", "has_symptoms", "mental_health_affects_work", "relationship_scores", "leadership_scores", "created_at", "updated_at"],
      properties: {
        employee_id: {
          bsonType: "string",
          minLength: 1,
          maxLength: 50
        },
        assessment_date: { bsonType: "date" },
        emoji_choice: {
          bsonType: "object",
          required: ["display_name", "emoji"],
          properties: {
            display_name: {
              bsonType: "string",
              enum: ["Triste", "Alegre", "Cansado", "Ansioso", "Medo", "Raiva"]
            },
            emoji: { bsonType: "string" }
          }
        },
        feeling_choice: {
          bsonType: "object",
          required: ["display_name"],
          properties: {
            display_name: {
              bsonType: "string",
              enum: ["Motivado", "Cansado", "Preocupado", "Estressado", "Animado", "Satisfeito"]
            }
          }
        },
        workload_level: {
          bsonType: "object",
          required: ["display_name"],
          properties: {
            display_name: {
              bsonType: "string",
              enum: ["Muito Leve", "Leve", "Média", "Alta", "Muito Alta"]
            }
          }
        },
        workload_affects_life: {
          bsonType: "object",
          required: ["display_name"],
          properties: {
            display_name: {
              bsonType: "string",
              enum: ["Não", "Raramente", "Algumas vezes", "Frequentemente", "Sempre"]
            }
          }
        },
        works_overtime: {
          bsonType: "object",
          required: ["display_name"],
          properties: {
            display_name: {
              bsonType: "string",
              enum: ["Não", "Raramente", "Algumas vezes", "Frequentemente", "Sempre"]
            }
          }
        },
        has_symptoms: {
          bsonType: "object",
          required: ["display_name"],
          properties: {
            display_name: {
              bsonType: "string",
              enum: ["Não", "Raramente", "Algumas vezes", "Frequentemente", "Sempre"]
            }
          }
        },
        mental_health_affects_work: {
          bsonType: "object",
          required: ["display_name"],
          properties: {
            display_name: {
              bsonType: "string",
              enum: ["Não", "Raramente", "Algumas vezes", "Frequentemente", "Sempre"]
            }
          }
        },
        relationship_scores: {
          bsonType: "object",
          required: ["boss", "colleagues", "respect_from_colleagues", "team_collaboration", "freedom_to_express", "team_welcoming", "team_cooperation"],
          properties: {
            boss: { bsonType: "number", minimum: 1, maximum: 5 },
            colleagues: { bsonType: "number", minimum: 1, maximum: 5 },
            respect_from_colleagues: { bsonType: "number", minimum: 1, maximum: 5 },
            team_collaboration: { bsonType: "number", minimum: 1, maximum: 5 },
            freedom_to_express: { bsonType: "number", minimum: 1, maximum: 5 },
            team_welcoming: { bsonType: "number", minimum: 1, maximum: 5 },
            team_cooperation: { bsonType: "number", minimum: 1, maximum: 5 }
          }
        },
        leadership_scores: {
          bsonType: "object",
          required: ["clear_instructions", "open_communication", "efficient_information", "clear_goals", "leadership_cares", "leadership_available", "comfortable_reporting", "recognized_by_leadership", "trust_in_leadership"],
          properties: {
            clear_instructions: { bsonType: "number", minimum: 1, maximum: 5 },
            open_communication: { bsonType: "number", minimum: 1, maximum: 5 },
            efficient_information: { bsonType: "number", minimum: 1, maximum: 5 },
            clear_goals: { bsonType: "number", minimum: 1, maximum: 5 },
            leadership_cares: { bsonType: "number", minimum: 1, maximum: 5 },
            leadership_available: { bsonType: "number", minimum: 1, maximum: 5 },
            comfortable_reporting: { bsonType: "number", minimum: 1, maximum: 5 },
            recognized_by_leadership: { bsonType: "number", minimum: 1, maximum: 5 },
            trust_in_leadership: { bsonType: "number", minimum: 1, maximum: 5 }
          }
        },
        observations: { bsonType: "string" },
        assessment_score: { bsonType: "number", minimum: 0, maximum: 100 },
        risk_level: {
          bsonType: "string",
          enum: ["Baixo", "Médio", "Alto", "Crítico"]
        },
        created_at: { bsonType: "date" },
        updated_at: { bsonType: "date" }
      }
    }
  }
});

print(" Coleção assessments criada");

// Coleção resources
db.createCollection("resources", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["title", "description", "category", "content", "icon", "color", "difficulty_level", "estimated_time_minutes", "is_active", "priority", "created_by", "created_at", "updated_at"],
      properties: {
        title: {
          bsonType: "string",
          minLength: 1,
          maxLength: 100
        },
        description: {
          bsonType: "string",
          minLength: 10,
          maxLength: 500
        },
        category: {
          bsonType: "string",
          enum: ["Respiração", "Exercícios", "Mindfulness", "Apoio Social", "Leitura", "Vídeos", "Podcasts", "Meditação", "Relaxamento", "Produtividade"]
        },
        content: {
          bsonType: "string",
          minLength: 50
        },
        icon: {
          bsonType: "string",
          enum: ["SelfImprovement", "FitnessCenter", "Psychology", "Group", "Book", "VideoLibrary", "Meditation", "Spa", "Work"]
        },
        color: {
          bsonType: "string",
          pattern: "^#[0-9A-Fa-f]{6}$"
        },
        difficulty_level: {
          bsonType: "string",
          enum: ["Iniciante", "Intermediário", "Avançado"]
        },
        estimated_time_minutes: {
          bsonType: "number",
          minimum: 1,
          maximum: 480
        },
        priority: {
          bsonType: "number",
          minimum: 1,
          maximum: 10
        },
        is_active: { bsonType: "bool" },
        created_at: { bsonType: "date" },
        updated_at: { bsonType: "date" }
      }
    }
  }
});

print(" Coleção resources criada");

// Coleção analytics
db.createCollection("analytics", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["employee_id", "report_date", "report_type", "period", "risk_assessment", "generated_at"],
      properties: {
        employee_id: {
          bsonType: "string",
          minLength: 1,
          maxLength: 50
        },
        report_date: { bsonType: "date" },
        report_type: {
          bsonType: "string",
          enum: ["daily", "weekly", "monthly", "quarterly", "yearly", "custom"]
        },
        period: {
          bsonType: "object",
          required: ["start_date", "end_date", "type"],
          properties: {
            start_date: { bsonType: "date" },
            end_date: { bsonType: "date" },
            type: {
              bsonType: "string",
              enum: ["daily", "weekly", "monthly", "quarterly", "yearly", "custom"]
            }
          }
        },
        risk_assessment: {
          bsonType: "object",
          required: ["risk_level"],
          properties: {
            risk_level: {
              bsonType: "string",
              enum: ["Baixo", "Médio", "Alto", "Crítico"]
            },
            risk_factors: { bsonType: "array" },
            recommendations: { bsonType: "array" },
            intervention_needed: { bsonType: "bool" }
          }
        },
        wellness_score: {
          bsonType: "object",
          properties: {
            overall_score: { bsonType: "number", minimum: 0, maximum: 100 },
            previous_score: { bsonType: "number", minimum: 0, maximum: 100 },
            score_change: { bsonType: "number" },
            score_trend: {
              bsonType: "string",
              enum: ["melhorando", "piorando", "estável"]
            }
          }
        },
        generated_at: { bsonType: "date" }
      }
    }
  }
});

print(" Coleção analytics criada");

// Coleção employee_profiles
db.createCollection("employee_profiles", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["employee_id", "personal_info", "wellness_preferences", "app_usage", "risk_profile", "privacy_settings", "created_at", "updated_at", "is_active"],
      properties: {
        employee_id: {
          bsonType: "string",
          minLength: 1,
          maxLength: 50,
          pattern: "^emp_[0-9]{3,6}$"
        },
        personal_info: {
          bsonType: "object",
          required: ["name", "email", "department", "position", "hire_date"],
          properties: {
            name: {
              bsonType: "string",
              minLength: 2,
              maxLength: 100
            },
            email: {
              bsonType: "string",
              pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
            },
            department: {
              bsonType: "string",
              enum: ["TI", "RH", "Financeiro", "Comercial", "Marketing", "Operações", "Suporte", "Gestão"]
            },
            position: { bsonType: "string" },
            hire_date: { bsonType: "date" },
            manager_id: { bsonType: "string" },
            team_id: { bsonType: "string" }
          }
        },
        wellness_preferences: {
          bsonType: "object",
          required: ["notification_frequency", "difficulty_preference", "time_availability"],
          properties: {
            notification_frequency: {
              bsonType: "string",
              enum: ["Diária", "Semanal", "Mensal", "Nunca"]
            },
            difficulty_preference: {
              bsonType: "string",
              enum: ["Iniciante", "Intermediário", "Avançado", "Todos"]
            },
            time_availability: {
              bsonType: "number",
              minimum: 5,
              maximum: 120
            },
            preferred_categories: { bsonType: "array" },
            goals: { bsonType: "array" },
            interests: { bsonType: "array" }
          }
        },
        app_usage: {
          bsonType: "object",
          required: ["first_login", "total_sessions", "total_time_minutes", "completed_assessments", "mood_entries_count"],
          properties: {
            first_login: { bsonType: "date" },
            last_login: { bsonType: "date" },
            total_sessions: { bsonType: "number", minimum: 0 },
            total_time_minutes: { bsonType: "number", minimum: 0 },
            completed_assessments: { bsonType: "number", minimum: 0 },
            mood_entries_count: { bsonType: "number", minimum: 0 },
            favorite_resources: { bsonType: "array" }
          }
        },
        risk_profile: {
          bsonType: "object",
          required: ["current_risk_level"],
          properties: {
            current_risk_level: {
              bsonType: "string",
              enum: ["Baixo", "Médio", "Alto", "Crítico"]
            },
            risk_factors: { bsonType: "array" },
            intervention_history: { bsonType: "array" },
            last_intervention: { bsonType: "date" },
            intervention_success: { bsonType: "bool" }
          }
        },
        privacy_settings: {
          bsonType: "object",
          required: ["data_sharing", "anonymous_analytics", "manager_visibility", "hr_visibility"],
          properties: {
            data_sharing: { bsonType: "bool" },
            anonymous_analytics: { bsonType: "bool" },
            manager_visibility: { bsonType: "bool" },
            hr_visibility: { bsonType: "bool" }
          }
        },
        is_active: { bsonType: "bool" },
        created_at: { bsonType: "date" },
        updated_at: { bsonType: "date" }
      }
    }
  }
});

print(" Coleção employee_profiles criada");

// Coleção notifications
db.createCollection("notifications", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["employee_id", "type", "title", "message", "priority", "category", "status", "created_at", "updated_at"],
      properties: {
        employee_id: {
          bsonType: "string",
          minLength: 1,
          maxLength: 50
        },
        type: {
          bsonType: "string",
          enum: ["reminder", "assessment", "resource", "achievement", "warning", "info", "urgent"]
        },
        title: {
          bsonType: "string",
          minLength: 1,
          maxLength: 200
        },
        message: {
          bsonType: "string",
          minLength: 1,
          maxLength: 1000
        },
        priority: {
          bsonType: "string",
          enum: ["low", "medium", "high", "urgent"]
        },
        category: {
          bsonType: "string",
          enum: ["wellness", "assessment", "resource", "achievement", "system", "safety", "reminder"]
        },
        status: {
          bsonType: "string",
          enum: ["pending", "scheduled", "sent", "delivered", "read", "failed", "expired", "cancelled"]
        },
        scheduled_for: { bsonType: "date" },
        sent_at: { bsonType: "date" },
        read_at: { bsonType: "date" },
        action_required: { bsonType: "bool" },
        action_url: { bsonType: "string" },
        action_button_text: { bsonType: "string" },
        expires_at: { bsonType: "date" },
        created_at: { bsonType: "date" },
        updated_at: { bsonType: "date" }
      }
    }
  }
});

print(" Coleção notifications criada");

