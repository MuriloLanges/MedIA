import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

interface FormData {
  age: string;
  sex: string;
  medicalHistory: string[];
  symptoms: string;
  intensity: string;
  duration: string;
  additionalInfo: string;
}

const Assessment = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    age: "",
    sex: "",
    medicalHistory: [],
    symptoms: "",
    intensity: "",
    duration: "",
    additionalInfo: "",
  });

  const medicalConditions = [
    "Diabetes",
    "Asma", 
    "Problemas Cardíacos",
    "Hipertensão",
    "Alergias",
    "Depressão/Ansiedade"
  ];

  const handleMedicalHistoryChange = (condition: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      medicalHistory: checked 
        ? [...prev.medicalHistory, condition]
        : prev.medicalHistory.filter(c => c !== condition)
    }));
  };

  const handleSubmit = () => {
    // Store form data and navigate to results
    localStorage.setItem('currentAssessment', JSON.stringify(formData));
    navigate('/resultado');
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-medium text-foreground">
            Avaliação Médica Preliminar
          </h1>
          <Button 
            variant="outline" 
            onClick={() => navigate('/historico')}
            className="border-border hover:bg-muted"
          >
            Histórico (3)
          </Button>
        </div>

        {/* Patient Information Card */}
        <Card className="mb-6 bg-card border-border card-shadow">
          <CardHeader>
            <CardTitle className="text-xl text-card-foreground">
              Informações do Paciente
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Preencha suas informações básicas para uma avaliação mais precisa.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Age */}
            <div className="space-y-2">
              <Label htmlFor="age">Idade</Label>
              <Input
                id="age"
                placeholder="Digite a sua idade"
                value={formData.age}
                onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                className="bg-input border-border"
              />
            </div>

            {/* Sex */}
            <div className="space-y-3">
              <Label>Sexo</Label>
              <RadioGroup 
                value={formData.sex}
                onValueChange={(value) => setFormData(prev => ({ ...prev, sex: value }))}
                className="flex gap-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="masculino" id="masculino" />
                  <Label htmlFor="masculino">Masculino</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="feminino" id="feminino" />
                  <Label htmlFor="feminino">Feminino</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="outro" id="outro" />
                  <Label htmlFor="outro">Outro</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Medical History */}
            <div className="space-y-3">
              <Label>Histórico Médico (selecione se aplicável)</Label>
              <div className="grid grid-cols-2 gap-4">
                {medicalConditions.map((condition) => (
                  <div key={condition} className="flex items-center space-x-2">
                    <Checkbox
                      id={condition}
                      checked={formData.medicalHistory.includes(condition)}
                      onCheckedChange={(checked) => 
                        handleMedicalHistoryChange(condition, !!checked)
                      }
                    />
                    <Label htmlFor={condition} className="text-sm">
                      {condition}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Symptoms Card */}
        <Card className="mb-6 bg-card border-border card-shadow">
          <CardContent className="pt-6 space-y-6">
            {/* Symptoms */}
            <div className="space-y-2">
              <Label htmlFor="symptoms">Sintomas</Label>
              <Input
                id="symptoms"
                placeholder="Ex: Dor de cabeça, febre..."
                value={formData.symptoms}
                onChange={(e) => setFormData(prev => ({ ...prev, symptoms: e.target.value }))}
                className="bg-input border-border"
              />
            </div>

            {/* Intensity */}
            <div className="space-y-2">
              <Label>Intensidade (1-10)</Label>
              <Select 
                value={formData.intensity}
                onValueChange={(value) => setFormData(prev => ({ ...prev, intensity: value }))}
              >
                <SelectTrigger className="bg-input border-border">
                  <SelectValue placeholder="Selecione a intensidade" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Duration */}
            <div className="space-y-2">
              <Label>Duração</Label>
              <Select 
                value={formData.duration}
                onValueChange={(value) => setFormData(prev => ({ ...prev, duration: value }))}
              >
                <SelectTrigger className="bg-input border-border">
                  <SelectValue placeholder="Há quanto tempo?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="minutos">Alguns minutos</SelectItem>
                  <SelectItem value="horas">Algumas horas</SelectItem>
                  <SelectItem value="dias">1-2 dias</SelectItem>
                  <SelectItem value="semana">1 semana</SelectItem>
                  <SelectItem value="semanas">Várias semanas</SelectItem>
                  <SelectItem value="meses">Vários meses</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Additional Information */}
            <div className="space-y-2">
              <Label htmlFor="additional">Informações Adicionais (opcional)</Label>
              <Textarea
                id="additional"
                placeholder="Descreva qualquer informação adicional relevante (medicamentos em uso, cirurgias recentes, etc...)"
                value={formData.additionalInfo}
                onChange={(e) => setFormData(prev => ({ ...prev, additionalInfo: e.target.value }))}
                className="bg-input border-border min-h-[100px]"
              />
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-center mb-8">
          <Button 
            onClick={handleSubmit}
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-base"
            size="lg"
          >
            Gerar Avaliação com IA
          </Button>
        </div>

        {/* Warning Footer */}
        <Card className="bg-warning/50 border-warning card-shadow">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-warning-foreground mt-0.5 flex-shrink-0" />
              <p className="text-sm text-warning-foreground">
                <strong>Aviso:</strong> Esta ferramenta utiliza IA para fornecer avaliação preliminar. 
                Não substitui consulta médica profissional. Em emergências, procure atendimento imediatamente.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Assessment;