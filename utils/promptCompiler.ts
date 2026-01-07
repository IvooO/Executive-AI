
import { ProtocolConfig } from '../types';

export const compileSystemPrompt = (config: ProtocolConfig): string => {
    
    // We strictly use the two main prompt fields as the source of truth
    // 1. Behavior (Authority / System Instruction)
    // 2. Goals (Yearly Vision / Strategic Context)
    
    const currentDate = new Date().toDateString();

    const prompt = `
=== SYSTEM META-CONTEXT ===
Current Date: ${currentDate}
Agent Name: ${config.authority.agentName}

=== BEHAVIOR & INSTRUCTIONS ===
${config.authority.customSystemPrompt || "Act as a high-performance executive coach."}

=== STRATEGIC CONTEXT & GOALS ===
${config.yearlyVision || "No strategic context provided."}
`;

    return prompt.trim();
};
