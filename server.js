const express = require('express');
const Anthropic = require('@anthropic-ai/sdk');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

function buildResearchPrompt(productCategory, country, product, productLink, amazonLink) {
  return `I am researching the mass desires that exist in the market for products in the
${productCategory} space in ${country}.
My product category is: ${product}
For reference, here is my product: ${productLink || 'Not provided'}
And here is a similar product on Amazon: ${amazonLink || 'Not provided'}

YOUR MISSION: Conduct systematic market research to discover what desires
ALREADY EXIST in this market. Do not make assumptions about who the customer is
or what they care about. Let the data reveal the desires, and let the desires reveal the
customer.
You are a reporter, not a novelist. Report what the market says, not what you think they
should say.

SURFACE DESIRE → EMOTIONAL DRIVER QUICK REFERENCE
CRITICAL REQUIREMENT: For EACH of the 10 surface desires you identify (5 Primary
+ 5 Secondary/Untapped), you MUST find and report EXACTLY 3 emotional drivers that
fuel it. Every single surface desire must have 3 emotional drivers mapped to it. This is
non-negotiable. DO NOT STOP until you have completed emotion mapping for ALL 10 surface
desires. If you find yourself stopping early, you have failed the assignment.

PRIMARY SURFACE DESIRES:
Surface Desire #1: [Insert primary surface desire]
1. [Top emotional driver - with frequency %]
2. [Second emotional driver - with frequency %]
3. [Third emotional driver - with frequency %]
Surface Desire #2: [Insert primary surface desire]
1. [Top emotional driver - with frequency %]
2. [Second emotional driver - with frequency %]
3. [Third emotional driver - with frequency %]
Surface Desire #3: [Insert primary surface desire]
1. [Top emotional driver - with frequency %]
2. [Second emotional driver - with frequency %]
3. [Third emotional driver - with frequency %]
Surface Desire #4: [Insert primary surface desire]
1. [Top emotional driver - with frequency %]
2. [Second emotional driver - with frequency %]
3. [Third emotional driver - with frequency %]
Surface Desire #5: [Insert primary surface desire]
1. [Top emotional driver - with frequency %]
2. [Second emotional driver - with frequency %]
3. [Third emotional driver - with frequency %]

SECONDARY/UNTAPPED MARKET DESIRES:
Surface Desire #6: [Insert secondary/untapped desire]
1. [Top emotional driver - with frequency %]
2. [Second emotional driver - with frequency %]
3. [Third emotional driver - with frequency %]
Surface Desire #7: [Insert secondary/untapped desire]
1. [Top emotional driver - with frequency %]
2. [Second emotional driver - with frequency %]
3. [Third emotional driver - with frequency %]
Surface Desire #8: [Insert secondary/untapped desire]
1. [Top emotional driver - with frequency %]
2. [Second emotional driver - with frequency %]
3. [Third emotional driver - with frequency %]
Surface Desire #9: [Insert secondary/untapped desire]
1. [Top emotional driver - with frequency %]
2. [Second emotional driver - with frequency %]
3. [Third emotional driver - with frequency %]
Surface Desire #10: [Insert secondary/untapped desire]
1. [Top emotional driver - with frequency %]
2. [Second emotional driver - with frequency %]
3. [Third emotional driver - with frequency %]

VERIFICATION CHECKPOINT: Before proceeding to Step 7 (Final Deliverable), verify
you have completed emotional mapping for ALL 10 surface desires (30 total emotional
driver entries). If you have fewer than 30 entries above, you must go back and complete
the missing mappings.

CRITICAL DISTINCTION: WHAT IS A DESIRE?
DESIRES = OUTCOMES PEOPLE GET BY USING THE PRODUCT
A desire is something that happens in the customer's life or their beneficiary's life AS A
RESULT OF USING the product.

Desires are:
- Health outcomes their pet/child/self experiences
- Behavioral changes that occur
- Problems that get prevented or solved
- Experiences they have
- Transformations that happen
- Financial outcomes they achieve

DESIRES ARE NOT:
- Product design requirements ("easy to clean", "dishwasher-safe", "few parts")
- Material specifications ("stainless steel", "ceramic", "BPA-free")
- Technical features ("wireless", "quiet", "durable", "replaceable parts")
- What they want the product TO BE (usability characteristics)
- What they want the product TO DO mechanically (eliminate bacteria, resist scratches)

THE FUNDAMENTAL TEST: Before recording anything as a desire, ask: "Is this
something they GET BY USING the product, or is this something they want the product
TO BE?"
If it's what they GET BY USING → It's a desire
If it's what they want it TO BE → It's a product requirement

RESEARCH STANDARDS:
You have access to deep research capabilities. Use them fully. Do NOT limit yourself to
minimum thresholds - go as deep as the data allows.

Target Research Scope:
Amazon Reviews: Analyze 100-200+ reviews across 10-15 competing/similar products. Include full range: 1-star through 5-star. Prioritize reviews with high helpfulness votes.
Reddit: Scan 50-100+ posts and their comment threads from 5-10 relevant subreddits.
Forums & Quora: Analyze 30-50+ discussion threads across specialized forums.
Social Media: Search 50+ posts across Facebook Groups, Twitter/X, TikTok, Instagram, YouTube comments.
Review Sites & Blogs: Scan 20-30+ professional reviews and their comment sections.
Total Target: 700-1000+ distinct customer voices.

RESEARCH APPROACH:
PHASE 1: PRIMARY CATEGORY RESEARCH (First 500-700 sources)

Phase 1A: Broad Scanning (First 200 sources)
- Cast a wide net across all platforms
- Identify the most common desire patterns
- Note which platforms yield the richest emotional language

Phase 1B: Deep Diving (Next 300+ sources)
- Focus on platforms/threads with highest desire density
- Look for edge cases and minority desires (track but don't prioritize)
- Validate that top desires from Phase 1A continue to dominate

Phase 1C: Saturation Check
- Are you still finding new desires, or just seeing repeats?
- If after 500+ sources you're only seeing repetition, you've hit saturation
- If new desires keep emerging, keep researching

Phase 1D: Intensity Deep Dive
- Go back to the highest-intensity emotional language
- Read full comment threads for context
- Understand the STORY behind the emotion

PHASE 2: ADJACENT PROBLEM SPACE RESEARCH (Additional 200-300 sources)
This is where you find the less obvious but potentially more valuable desires.

Step 1: Identify the core mechanisms/benefits of the product - what does it physically DO?
Step 2: Research those MECHANISMS, not the product category
Step 3: Look for UNEXPECTED problem spaces where your product type appears
Step 4: Validate that the desire appears in market data
Step 5: Log as "Secondary/Untapped Market Desire" if the desire exists, the product could believably deliver it, emotional intensity is 4.0+, and it appears at least 10-15 times.

STEP 1: DISCOVER PRIMARY SURFACE DESIRES
Focus on: Health outcomes, Behavioral changes, Life improvements, Problem avoidance, Transformations.
IGNORE: Product design requirements, usability characteristics, material preferences, technical specifications, features.

DETECTION LOGIC:
IF customer mentions product feature/design/material/usability → THEN skip it (not a desire)
IF customer mentions outcome/result/experience they get BY USING product → THEN record as desire

Extract and list PRIMARY SURFACE DESIRES using this format: "I want [outcome that happens BY USING the product]"

For each primary surface desire, track:
- Surface Desire Frequency Count
- Platform Distribution
- Sample Quotes (3-5 verbatim)
- Context Notes

STEP 1.5: KEYWORD FREQUENCY TRACKING
As you conduct your research, maintain an ongoing tracker of high-signal keywords:
- Category 1: Medical/Health Keywords
- Category 2: Pain Point Keywords
- Category 3: Emotional Intensity Keywords
- Category 4: Outcome/Benefit Keywords
- Category 5: Authority/Influence Keywords

STEP 2: DISCOVER SECONDARY/UNTAPPED MARKET DESIRES
After identifying your primary surface desires, conduct Phase 2 research to discover NON-OBVIOUS applications of the product in adjacent problem spaces.

CRITICAL: SECONDARY DESIRES MUST STILL BE OUTCOMES, NOT PRODUCT FEATURES.

STEP 3: DISCOVER EMOTIONAL DRIVERS
For every piece of customer language you analyzed (both primary AND secondary desires), look for the EMOTIONAL FUEL behind their surface desires.

CRITICAL: Emotional drivers are the DEEPEST emotional layer - the raw feelings that exist in their life, NOT about product experiences or shopping frustration.

WHAT ARE EMOTIONAL DRIVERS?
Emotional drivers are the core feelings, fears, anxieties, shame, pride, or social consequences that fuel the desire for an outcome. They answer: "WHY does this outcome matter to me emotionally?"

CRITICAL DISTINCTION: EMOTIONAL DRIVERS VS. SHOPPING FRUSTRATION
CORRECT - These are about LIFE FEELINGS:
- "I'm scared my cat will die from kidney disease"
- "I feel guilty I'm not doing enough for my cat"
- "I'm embarrassed when my stomach looks pregnant in public"

INCORRECT - These are about PRODUCT/SHOPPING EXPERIENCE:
- "I'm frustrated by products that don't work"
- "I'm angry about wasting money on failed products"

The emotional driver should exist BEFORE they start shopping. It's about the problem in their life, not their buying experience.

Core emotion categories:
1. FEAR - Anxiety, worry, dread, terror
2. GUILT/SHAME - Feeling inadequate, judged, embarrassed
3. FRUSTRATION/HELPLESSNESS - Feeling powerless, stuck
4. SADNESS/GRIEF - Loss, regret, disappointment
5. LOVE/PROTECTION - Nurturing, caring, safeguarding
6. PRIDE/CONFIDENCE - Feeling competent, responsible
7. SOCIAL ANXIETY/EMBARRASSMENT - Fear of judgment

CONTEXT IS MANDATORY - never record a generic emotion without specific context:
BAD: "I'm embarrassed" → Too vague
GOOD: "I'm embarrassed when my stomach looks pregnant in public"

STEP 4: MAP EMOTIONAL DRIVERS TO SURFACE DESIRES
MANDATORY: FIND 3 EMOTIONAL DRIVERS FOR EVERY SURFACE DESIRE.

You MUST identify at least 3 distinct emotional drivers for each of your 10 surface desires (5 primary + 5 secondary/untapped). This means you will produce a minimum of 30 emotional driver entries in Step 4.

Format for each desire:
PRIMARY SURFACE DESIRE #X: "I want [outcome]" - Total mentions: [N]
EMOTIONAL DRIVERS (ranked by frequency):
1. "[Emotional driver with context]" - [N] mentions ([%])
   - Intensity: [X]/5
   - Evidence: [3-5 verbatim quotes]
2. "[Emotional driver with context]" - [N] mentions ([%])
   - Intensity: [X]/5
   - Evidence: [3-5 verbatim quotes]
3. "[Emotional driver with context]" - [N] mentions ([%])
   - Intensity: [X]/5
   - Evidence: [3-5 verbatim quotes]

STEP 5: QUANTITATIVE RANKING
Create three master ranking tables:

TABLE A: PRIMARY SURFACE DESIRES (Ranked by Frequency)
- Rank, Surface Desire, Total Mentions, Platform Diversity, % of Total, Top 3 Quotes

TABLE B: SECONDARY/UNTAPPED MARKET DESIRES (Ranked by Opportunity Score)
Opportunity Score = (Emotional Intensity × Market Gap) / Competition Level
- Rank, Surface Desire, Total Mentions, Emotional Intensity, Market Saturation, Opportunity Score

TABLE C: EMOTIONAL DRIVERS (Master Ranking - Across All Surface Desires)
- Rank, Emotional Driver, Total Mentions, Avg Intensity, Platform Diversity, % of Total, Drives Which Surface Desires

STEP 6: IDENTIFY DESIRE CLUSTERS (Natural Avatar Segments)
Look for patterns revealing natural customer segments based on desires. DO NOT create demographic segments yet.

Example segments:
- "The Anxious Protector" - dominated by FEAR emotions
- "The Helpless Sufferer" - dominated by HELPLESSNESS and FRUSTRATION
- "The Guilt-Driven Caretaker" - dominated by GUILT and SHAME

ONLY report segments if clear patterns emerge.

STEP 7: FINAL DELIVERABLE
Provide a comprehensive report with:

1. Executive Summary
   - Total sources analyzed
   - Breakdown by platform
   - Top 5 primary surface desires by frequency
   - Top 5 secondary/untapped desires by opportunity score
   - Top 5-7 emotional drivers by frequency + intensity
   - Number of natural desire-based segments identified
   - Confidence level with justification

2. Surface Desire Rankings
   TABLE A: PRIMARY SURFACE DESIRES
   TABLE B: SECONDARY/UNTAPPED MARKET DESIRES

3. Emotional Driver Rankings
   TABLE C: EMOTIONAL DRIVERS (Master List)

4. Emotion-to-Surface Mapping
   For each of the 10 surface desires: ALL emotional drivers meeting 10% threshold (MINIMUM 3)
   VERIFY: You must have at least 30 total emotion mapping entries

4.5 Avatar Targeting Statements
   For each of the 10 surface desires, format:
   "I am targeting people who want to [SURFACE DESIRE] because they [TOP EMOTIONAL DRIVER]."

5. Natural Desire-Based Segments (only if clear patterns emerge)

6. Research Quality Metrics

7. Honest Assessment
   - Were there desires you expected to find but didn't?
   - Any surprises in the data?
   - What desires did NOT make the cut and why?

8. Product Requirements Log (Separate from Desires)
   Track product requirements customers mentioned, but DO NOT include in surface desires.

QUALITY CHECKLIST:
Before submitting, verify:
[ ] Analyzed 700-1000+ distinct customer voices (or documented why fewer)
[ ] Every surface desire is an outcome BY USING the product
[ ] NO surface desires describe product usability, maintenance, or mechanical functions
[ ] Found 10 total surface desires (5 primary + 5 secondary/untapped)
[ ] Every emotional driver is about LIFE FEELINGS, not product/shopping experience
[ ] Every emotional driver includes specific context/trigger
[ ] Found EXACTLY 3 emotional drivers for EACH of the 10 surface desires (30 total)
[ ] Created avatar targeting statements for all 10 desires

FINAL REMINDER:
Surface desires = outcomes people GET BY USING the product (health outcomes, behavioral changes, life transformations, problem prevention, financial outcomes)
NOT product requirements (usability, mechanical functions, materials, features)
Emotional drivers = the raw feelings in their life situation that fuel the desire for those outcomes (fear, guilt, embarrassment WITH SPECIFIC CONTEXT - NOT product frustration)
Structure: 10 surface desires × 3 emotional drivers = 30 total emotion mappings. Non-negotiable.`;
}

app.post('/api/research', async (req, res) => {
  const { productCategory, country, product, productLink, amazonLink, extendedThinking } = req.body;

  if (!productCategory || !country || !product) {
    return res.status(400).json({ error: 'Product category, country, and product name are required.' });
  }

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');
  res.flushHeaders();

  const prompt = buildResearchPrompt(productCategory, country, product, productLink, amazonLink);

  const messageParams = {
    model: 'claude-opus-4-6',
    max_tokens: extendedThinking ? 16000 : 16000,
    system: 'You are an expert market research analyst with deep knowledge of consumer psychology, product markets, and desire mapping. You synthesize patterns from Amazon reviews, Reddit communities, forums, and social media discussions to identify what customers truly want. Draw from your comprehensive knowledge of consumer behavior, product categories, and market dynamics to provide specific, data-grounded insights with realistic frequency estimates based on typical market patterns. Be precise with emotional language and always dig to the deepest emotional layer.',
    messages: [{ role: 'user', content: prompt }],
  };

  if (extendedThinking) {
    messageParams.thinking = {
      type: 'enabled',
      budget_tokens: 8000,
    };
  }

  try {
    const stream = anthropic.messages.stream(messageParams);

    stream.on('text', (text) => {
      const data = JSON.stringify({ type: 'text', text });
      res.write(`data: ${data}\n\n`);
    });

    stream.on('message', () => {
      res.write('data: [DONE]\n\n');
      res.end();
    });

    stream.on('error', (error) => {
      const data = JSON.stringify({ type: 'error', message: error.message });
      res.write(`data: ${data}\n\n`);
      res.end();
    });

    req.on('close', () => {
      stream.controller.abort();
    });
  } catch (error) {
    const data = JSON.stringify({ type: 'error', message: error.message });
    res.write(`data: ${data}\n\n`);
    res.end();
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Desire Research App running at http://localhost:${PORT}`);
  if (!process.env.ANTHROPIC_API_KEY) {
    console.warn('Warning: ANTHROPIC_API_KEY environment variable is not set.');
  }
});
