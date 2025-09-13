import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, TrendingUp, Check, AlertTriangle } from "lucide-react";

interface AssessmentData {
  age: string;
  sex: string;
  medicalHistory: string[];
  symptoms: string;
  intensity: string;
  duration: string;
  additionalInfo: string;
}

const Results = () => {
  const navigate = useNavigate();
  const [assessmentData, setAssessmentData] = useState<AssessmentData | null>(null);

  useEffect(() => {
    const data = localStorage.getItem('currentAssessment');
    if (data) {
      setAssessmentData(JSON.parse(data));
    } else {
      navigate('/');
    }
  }, [navigate]);

  const saveToHistory = () => {
    if (assessmentData) {
      const history = JSON.parse(localStorage.getItem('consultationHistory') || '[]');
      const newEntry = {
        id: Date.now(),
        date: new Date().toLocaleDateString('pt-BR'),
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        urgency: 'MÉDIA',
        summary: `1 sintoma(s) - ${assessmentData.age} anos - ${assessmentData.sex}`,
        assessment: `Paciente de ${assessmentData.age} anos, sexo ${assessmentData.sex}. ${
          assessmentData.medicalHistory.length > 0 
            ? `Histórico: ${assessmentData.medicalHistory.join(', ')}. ` 
            : ''
        }Quadro clínico inespecífico - monitoramento e avaliação médica recomendados. Recomenda-se consulta médica em 24-48h.`,
        symptoms: assessmentData.symptoms,
        intensity: assessmentData.intensity,
        duration: assessmentData.duration
      };
      history.unshift(newEntry);
      localStorage.setItem('consultationHistory', JSON.stringify(history));
    }
  };

  const handleNewConsultation = () => {
    saveToHistory();
    navigate('/');
  };

  const handleGoToHistory = () => {
    saveToHistory();
    navigate('/historico');
  };

  if (!assessmentData) {
    return <div>Carregando...</div>;
  }

  const recommendations = [
    "Agende consulta médica nas próximas 24-48 horas",
    "Monitor os sintomas de perto",
    "Mantenha-se hidratado",
    "Não tome medicamentos sem prescrição médica",
    "Mantenha uma alimentação leve"
  ];

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="p-0 h-auto hover:bg-transparent"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-3xl font-medium text-foreground">
              Resultado da Avaliação
            </h1>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="outline"
              onClick={handleGoToHistory}
              className="border-border hover:bg-muted"
            >
              Histórico
            </Button>
            <Button 
              onClick={handleNewConsultation}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Nova Consulta
            </Button>
          </div>
        </div>

        {/* Urgency Level Card */}
        <Card className="mb-6 bg-urgency-medium border-urgency-medium-foreground/20 card-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-urgency-medium-foreground" />
              <div>
                <h3 className="font-medium text-urgency-medium-foreground text-lg">
                  Nível de Urgência: MÉDIA
                </h3>
                <p className="text-sm text-urgency-medium-foreground/80">
                  Considere agendar consulta médica em 24-48h.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Assessment Card */}
        <Card className="mb-6 bg-card border-border card-shadow">
          <CardHeader>
            <CardTitle className="text-xl text-card-foreground">
              Avaliação Preliminar (IA)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-card-foreground leading-relaxed">
              Paciente de {assessmentData.age} anos, sexo {assessmentData.sex}. 
              {assessmentData.medicalHistory.length > 0 && (
                <> Histórico: {assessmentData.medicalHistory.join(', ')}.</>
              )} Quadro clínico inespecífico - monitoramento e avaliação médica recomendados. 
              Recomenda-se consulta médica em 24-48h.
            </p>
          </CardContent>
        </Card>

        {/* Recommendations Card */}
        <Card className="mb-6 bg-card border-border card-shadow">
          <CardHeader>
            <CardTitle className="text-xl text-card-foreground">
              Recomendações
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <p className="text-card-foreground text-sm">{recommendation}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Consultation Summary Card */}
        <Card className="mb-6 bg-card border-border card-shadow">
          <CardHeader>
            <CardTitle className="text-xl text-card-foreground">
              Resumo da Consulta
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-medium text-card-foreground mb-2">Perfil do Paciente</h4>
                <p className="text-sm text-muted-foreground">
                  {assessmentData.age} anos, {assessmentData.sex}
                </p>
                {assessmentData.medicalHistory.length > 0 && (
                  <p className="text-sm text-muted-foreground">
                    Histórico: {assessmentData.medicalHistory.join(', ')}
                  </p>
                )}
              </div>
              <div>
                <h4 className="font-medium text-card-foreground mb-2">Data da Consulta</h4>
                <p className="text-sm text-muted-foreground">
                  {new Date().toLocaleDateString('pt-BR')} às {new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
            
            <div className="border-t border-border pt-4">
              <h4 className="font-medium text-card-foreground mb-3">Sintomas Reportados</h4>
              <div className="space-y-2">
                <p className="text-sm text-card-foreground">{assessmentData.symptoms}</p>
                <div className="flex items-center gap-4">
                  <p className="text-sm text-muted-foreground">
                    Duração: {assessmentData.duration}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Intensidade:</span>
                    <Badge variant="secondary" className="text-xs">
                      {assessmentData.intensity}/10
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Warning Footer */}
        <Card className="bg-warning/50 border-warning card-shadow">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-warning-foreground mt-0.5 flex-shrink-0" />
              <p className="text-sm text-warning-foreground">
                <strong>Importante:</strong> Esta é apenas uma avaliação preliminar por IA. 
                Sempre consulte um profissional de saúde qualificado para diagnóstico adequado.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Results;