import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface HistoryEntry {
  id: number;
  date: string;
  time: string;
  urgency: 'ALTA' | 'MÉDIA' | 'BAIXA';
  summary: string;
  assessment: string;
  symptoms: string;
  intensity: string;
  duration: string;
}

const History = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    // Load mock data if no history exists
    const existingHistory = localStorage.getItem('consultationHistory');
    if (!existingHistory) {
      const mockHistory: HistoryEntry[] = [
        {
          id: 1,
          date: "25/09/2025",
          time: "14:30",
          urgency: "ALTA",
          summary: "1 sintoma(s) - 12 anos - masculino",
          assessment: "Paciente de 12 anos, sexo masculino. Histórico: Problemas Cardíacos, Depressão/Ansiedade. Quadro clínico inespecífico - monitoramento e avaliação médica recomendados. Monitore a evolução e consulte médico se persistir.",
          symptoms: "Dor de cabeça intensa",
          intensity: "8",
          duration: "2-3 dias"
        },
        {
          id: 2,
          date: "23/09/2025",
          time: "09:15",
          urgency: "BAIXA",
          summary: "1 sintoma(s) - 25 anos - feminino",
          assessment: "Paciente de 25 anos, sexo feminino. Histórico: Asma. Quadro clínico inespecífico - monitoramento e avaliação médica recomendados. Monitore a evolução e consulte médico se persistir.",
          symptoms: "Dor leve no estômago",
          intensity: "3",
          duration: "1 dia"
        },
        {
          id: 3,
          date: "21/09/2025",
          time: "16:45",
          urgency: "MÉDIA",
          summary: "1 sintoma(s) - 45 anos - masculino",
          assessment: "Paciente de 45 anos, sexo masculino. Histórico: Diabetes, Hipertensão. Quadro clínico inespecífico - monitoramento e avaliação médica recomendados. Recomenda-se consulta médica em 24-48h.",
          symptoms: "Tontura e fadiga",
          intensity: "5",
          duration: "1 semana"
        }
      ];
      localStorage.setItem('consultationHistory', JSON.stringify(mockHistory));
      setHistory(mockHistory);
    } else {
      setHistory(JSON.parse(existingHistory));
    }
  }, []);

  const getUrgencyVariant = (urgency: string) => {
    switch (urgency) {
      case 'ALTA':
        return 'urgency-high';
      case 'MÉDIA':
        return 'urgency-medium';
      case 'BAIXA':
        return 'urgency-low';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-medium text-foreground">
            Histórico de Consultas
          </h1>
          <Button 
            variant="outline"
            onClick={() => navigate('/')}
            className="border-border hover:bg-muted"
          >
            Nova Consulta
          </Button>
        </div>

        {/* History List */}
        <div className="space-y-4">
          {history.map((entry) => (
            <Card key={entry.id} className="bg-card border-border card-shadow transition-card hover:card-shadow-hover">
              <CardContent className="pt-6">
                {/* Header Row */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-card-foreground">
                      {entry.date}
                    </span>
                    <Badge 
                      variant="secondary"
                      className={`text-xs font-medium ${
                        entry.urgency === 'ALTA' 
                          ? 'urgency-high border' 
                          : entry.urgency === 'MÉDIA' 
                          ? 'urgency-medium border' 
                          : 'urgency-low border'
                      }`}
                    >
                      {entry.urgency}
                    </Badge>
                  </div>
                </div>

                {/* Summary Row */}
                <div className="mb-3">
                  <p className="text-sm text-muted-foreground">
                    {entry.summary}
                  </p>
                </div>

                {/* Assessment Content */}
                <div>
                  <p className="text-sm text-card-foreground leading-relaxed">
                    {entry.assessment}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {history.length === 0 && (
          <Card className="bg-card border-border card-shadow">
            <CardContent className="pt-6 text-center py-12">
              <p className="text-muted-foreground">
                Nenhuma consulta encontrada. Faça sua primeira avaliação!
              </p>
              <Button 
                className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => navigate('/')}
              >
                Nova Consulta
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default History;