// src/components/ValueCalculator/ValueCalculator.jsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Select,
  Slider,
  SliderTrack,
  SliderThumb,
  NumberInput,
  Button,
  Collapsible,
  Table,
  SimpleGrid,
  Stat,
  StatLabel,
  FormatNumber,
  useToken,
} from "@chakra-ui/react";

// --- your existing data/constants ---
const stageMultipliers = {
  "pre-seed": 0.7,
  seed: 1.0,
  "series-a": 1.3,
  "series-b": 1.6,
  "series-c": 2.0,
};
const regionalMultipliers = {
  "north-america": 1.0,
  europe: 0.8,
  "asia-pacific": 0.7,
  india: 0.3,
  other: 0.5,
};
const baseCosts = {
  assessment: { min: 15000, max: 30000 },
  valuation: { min: 50000, max: 90000 },
  network: { min: 30000, max: 60000 },
  recognition: { min: 20000, max: 30000 },
  education: { min: 5000, max: 15000 },
};
const assessmentLabels = ["Basic", "Standard", "Comprehensive"];
const networkLabels = ["Regional", "National", "Global"];

function formatCurrency(amount, region) {
  if (region === "india") {
    return `₹${Math.round(amount).toLocaleString("en-IN")}`;
  }
  return `$${Math.round(amount).toLocaleString()}`;
}

export default function ValueCalculator2() {
  // form state
  const [companyStage, setCompanyStage] = useState("seed");
  const [region, setRegion] = useState("north-america");
  const [assessmentComplexity, setAssessmentComplexity] = useState(2);
  const [valuationMethods, setValuationMethods] = useState(3);
  const [networkLevel, setNetworkLevel] = useState(2);
  const [consultingRate, setConsultingRate] = useState(200);
  const [projectDuration, setProjectDuration] = useState(6);
  const [additionalServices, setAdditionalServices] = useState(1);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // results
  const [tableRows, setTableRows] = useState([]);
  const [summaryCards, setSummaryCards] = useState([]);

  // pull in your theme tokens
  const [primary, muted] = useToken("colors", ["primary", "muted"]);

  // recalc whenever inputs change
  useEffect(() => {
    const stageMul = stageMultipliers[companyStage];
    const regMul = regionalMultipliers[region];

    const assessmentCost =
      (baseCosts.assessment.min +
        (baseCosts.assessment.max - baseCosts.assessment.min) *
          ((assessmentComplexity - 1) / 2)) *
      regMul *
      stageMul;
    const valuationCost =
      (baseCosts.valuation.min +
        (baseCosts.valuation.max - baseCosts.valuation.min) *
          ((valuationMethods - 1) / 4)) *
      regMul *
      stageMul;
    const networkCost =
      (baseCosts.network.min +
        (baseCosts.network.max - baseCosts.network.min) *
          ((networkLevel - 1) / 2)) *
      regMul *
      stageMul;
    const recognitionCost =
      (baseCosts.recognition.min +
        (baseCosts.recognition.max - baseCosts.recognition.min) * 0.5) *
      regMul *
      stageMul;
    const educationCost =
      (baseCosts.education.min +
        (baseCosts.education.max - baseCosts.education.min) * 0.5) *
      regMul *
      stageMul;

    const totalTraditional =
      (assessmentCost +
        valuationCost +
        networkCost +
        recognitionCost +
        educationCost) *
      additionalServices;

    const ourPrice = region === "india" ? 4999 : 99;
    const totalSavings = totalTraditional - ourPrice;
    const savingsPct = Math.max(
      0,
      (totalSavings / totalTraditional) * 100
    ).toFixed(2);
    const multiplier = (totalTraditional / ourPrice).toFixed(0);

    setTableRows([
      {
        label: "Professional Assessment",
        cost: assessmentCost,
        our: "✅",
        savings: assessmentCost,
      },
      {
        label: "Multi-Method Valuation",
        cost: valuationCost,
        our: "✅",
        savings: valuationCost,
      },
      {
        label: "Global Network Access",
        cost: networkCost,
        our: "✅",
        savings: networkCost,
      },
      {
        label: "Recognition & Credibility",
        cost: recognitionCost,
        our: "✅",
        savings: recognitionCost,
      },
      {
        label: "Educational Resources",
        cost: educationCost,
        our: "✅",
        savings: educationCost,
      },
      {
        label: "TOTAL",
        cost: totalTraditional,
        our: region === "india" ? `₹${ourPrice}` : `$${ourPrice}`,
        savings: totalSavings,
        isTotal: true,
      },
    ]);

    setSummaryCards([
      { title: "Savings Percentage", value: `${savingsPct}%` },
      { title: "Value Multiplier", value: `x${multiplier}` },
    ]);
  }, [
    companyStage,
    region,
    assessmentComplexity,
    valuationMethods,
    networkLevel,
    additionalServices,
    consultingRate,
    projectDuration,
  ]);

  function resetCalculator() {
    setCompanyStage("seed");
    setRegion("north-america");
    setAssessmentComplexity(2);
    setValuationMethods(3);
    setNetworkLevel(2);
    setConsultingRate(200);
    setProjectDuration(6);
    setAdditionalServices(1);
    setShowAdvanced(false);
  }

  return (
    <Box maxW="1200px" mx="auto" bg="bg" p={4} borderRadius="md" boxShadow="xl">
      {/* Header */}
      <Box
        textAlign="center"
        bg="accent"
        color="secondary"
        py={6}
        borderRadius="md"
      >
        <Heading size="lg">🚀 World Startup Sprint Value Calculator</Heading>
        <Text>
          Compare traditional consulting costs with our comprehensive platform
        </Text>
      </Box>

      {/* Main Columns */}
      <HStack spacing={6} align="flex-start" mt={6} flexWrap="wrap">
        {/* ── Left: Inputs */}
        <VStack
          bg="white"
          p={4}
          borderRadius="md"
          boxShadow="sm"
          flex="1"
          minW="280px"
          spacing={4}
        >
          <Heading size="md" color="primary">
            📊 Cost Comparison Calculator
          </Heading>

          <VStack align="stretch" spacing={3}>
            <Box>
              <Text fontWeight="semibold">Company Stage</Text>
              <Select
                value={companyStage}
                onChange={(e) => setCompanyStage(e.target.value)}
              >
                <option value="pre-seed">Pre-Seed</option>
                <option value="seed">Seed</option>
                <option value="series-a">Series A</option>
                <option value="series-b">Series B</option>
                <option value="series-c">Series C+</option>
              </Select>
            </Box>

            <Box>
              <Text fontWeight="semibold">Geographic Region</Text>
              <Select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              >
                <option value="north-america">North America</option>
                <option value="europe">Europe</option>
                <option value="asia-pacific">Asia-Pacific</option>
                <option value="india">India</option>
                <option value="other">Other Markets</option>
              </Select>
            </Box>

            <Box>
              <Text fontWeight="semibold">Assessment Complexity</Text>
              <Slider
                min={1}
                max={3}
                step={1}
                value={assessmentComplexity}
                onChange={(v) => setAssessmentComplexity(v)}
              >
                <SliderTrack bg={muted}>/**/</SliderTrack>
                <SliderThumb boxSize={6} bg="secondary" />
              </Slider>
              <Text textAlign="center" mt={1} fontWeight="bold">
                {assessmentLabels[assessmentComplexity - 1]}
              </Text>
            </Box>

            <Box>
              <Text fontWeight="semibold">Valuation Methods</Text>
              <Slider
                min={1}
                max={5}
                step={1}
                value={valuationMethods}
                onChange={(v) => setValuationMethods(v)}
              >
                <SliderTrack bg={muted}>/**/</SliderTrack>
                <SliderThumb boxSize={6} bg="secondary" />
              </Slider>
              <Text textAlign="center" mt={1} fontWeight="bold">
                {valuationMethods} Methods
              </Text>
            </Box>

            <Box>
              <Text fontWeight="semibold">Network Level</Text>
              <Slider
                min={1}
                max={3}
                step={1}
                value={networkLevel}
                onChange={(v) => setNetworkLevel(v)}
              >
                <SliderTrack bg={muted}>/**/</SliderTrack>
                <SliderThumb boxSize={6} bg="secondary" />
              </Slider>
              <Text textAlign="center" mt={1} fontWeight="bold">
                {networkLabels[networkLevel - 1]}
              </Text>
            </Box>
          </VStack>

          <HStack width="100%" justify="space-between" pt={2}>
            <Button
              colorScheme="primary"
              variant="outline"
              size="sm"
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              Advanced
            </Button>
            <Button colorScheme="thistle" size="sm" onClick={resetCalculator}>
              Reset
            </Button>
          </HStack>

          <Collapsible in={showAdvanced} animateOpacity>
            <VStack
              align="stretch"
              spacing={3}
              mt={3}
              bg="platinum"
              p={3}
              borderRadius="md"
            >
              <Box>
                <Text fontWeight="semibold">Consulting Rate ($/hr)</Text>
                <NumberInput
                  min={50}
                  max={500}
                  step={50}
                  value={consultingRate}
                  onChange={(_, v) => setConsultingRate(v)}
                ></NumberInput>
              </Box>
              <Box>
                <Text fontWeight="semibold">Project Duration (mo)</Text>
                <NumberInput
                  min={1}
                  max={24}
                  step={1}
                  value={projectDuration}
                  onChange={(_, v) => setProjectDuration(v)}
                ></NumberInput>
              </Box>
              <Box>
                <Text fontWeight="semibold">Additional Services ×</Text>
                <Slider
                  min={1}
                  max={3}
                  step={0.1}
                  value={additionalServices}
                  onChange={(v) => setAdditionalServices(v)}
                >
                  <SliderTrack bg={muted}>/**/</SliderTrack>
                  <SliderThumb boxSize={6} bg="secondary" />
                </Slider>
                <Text textAlign="center" mt={1} fontWeight="bold">
                  {additionalServices.toFixed(1)}×
                </Text>
              </Box>
            </VStack>
          </Collapsible>
        </VStack>

        {/* ── Right: Results */}
        <VStack
          bg="white"
          p={4}
          borderRadius="md"
          boxShadow="sm"
          flex="1"
          minW="280px"
          spacing={4}
        >
          <Heading size="md" color="primary">
            💰 Cost Breakdown
          </Heading>

          <Table variant="striped" size="sm">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>Service</Table.ColumnHeader>
                <Table.ColumnHeader isNumeric>Traditional</Table.ColumnHeader>
                <Table.ColumnHeader textAlign="center">Ours</Table.ColumnHeader>
                <Table.ColumnHeader isNumeric>Savings</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {tableRows.map((r, i) => (
                <Table.Row
                  key={i}
                  fontWeight={r.isTotal ? "bold" : "normal"}
                  bg={r.isTotal ? "accent" : undefined}
                  color={r.isTotal ? "secondary" : undefined}
                >
                  <Table.Cell>{r.label}</Table.Cell>
                  <Table.Cell isNumeric>
                    {formatCurrency(r.cost, region)}
                  </Table.Cell>
                  <Table.Cell textAlign="center">{r.our}</Table.Cell>
                  <Table.Cell isNumeric>
                    {formatCurrency(r.savings, region)}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} pt={4} w="100%">
            {summaryCards.map((c, i) => (
              <Stat
                key={i}
                bg="thistle"
                p={4}
                borderRadius="md"
                boxShadow="sm"
                textAlign="center"
              >
                <StatLabel>{c.title}</StatLabel>
                <FormatNumber>{c.value}</FormatNumber>
              </Stat>
            ))}
          </SimpleGrid>
        </VStack>
      </HStack>
    </Box>
  );
}
