// "Lab" — from-scratch NLP/LLM implementations. Voice: plain, declarative, no em dashes.

export const labIntro = "Calling an API is easy. I wanted to know what happens underneath it.";

export const labBody = [
  "So I sat down and implemented the modern NLP and LLM stack from first principles. Not to reinvent it. To understand it well enough that nothing about a model feels like magic.",
  "Forty-five runnable notebooks, from a regex tokenizer to RLHF. I'm a PM now, but I don't want to manage what I can't reason about. Building these means I can argue about context windows, eval design, or why a model hallucinates from the implementation up, not from a blog post.",
];

export type Pack = {
  name: string;
  count: string;
  blurb: string;
  topics: string[];
};

export const packs: Pack[] = [
  {
    name: "NLP implementation",
    count: "13 notebooks",
    blurb: "The arc from classic NLP to transformers, one technique at a time. Build each thing, run it on small data, see why the next thing exists.",
    topics: [
      "Tokenization + regex + lexicon sentiment",
      "TF-IDF with Naive Bayes, logistic regression, SVM",
      "N-gram LMs, smoothing, perplexity",
      "Word2Vec / GloVe + semantic search",
      "Sequence tagging: HMM, Viterbi, CRF, BiLSTM",
      "Neural text classification in PyTorch",
      "Attention + a tiny Transformer, by hand",
      "BERT / GPT / T5 with Hugging Face",
      "Pretraining, fine-tuning, LoRA, SFT, DPO",
      "Summarization, QA, RAG, ROUGE + faithfulness",
      "Machine translation + decoding + BLEU",
      "Product evals: kappa, PII redaction, monitoring",
    ],
  },
  {
    name: "Advanced LLM systems",
    count: "32 notebooks",
    blurb: "The systems layer. How a modern LLM is actually built, served, and kept honest.",
    topics: [
      "Tokenizers, embeddings, RoPE / ALiBi, attention, MHA",
      "Transformer blocks, mini-former, sampling, speculative decoding",
      "KV cache, MQA / GQA / MLA, long context, FlashAttention",
      "Mixture of experts, sparse + state-space models, diffusion LMs",
      "Synthetic data, scaling laws, SFT / DPO / RLHF / GRPO",
      "Quantization + serving stacks",
      "Eval harnesses, RAG, tool use + agents",
      "Vision-language adapters, interpretability",
      "Red-teaming + a capstone that wires it together",
    ],
  },
];

// Featured interpretability research (UNSW COMP6713 NLP course, team project).
export const interp = {
  eyebrow: "Interpretability research · UNSW COMP6713",
  title: "Can you tell what a model is thinking when its answer hides it?",
  framing: "A team research project for my NLP course at UNSW.",
  body: [
    "A language model can give the same answer to a clean prompt and a misspelled one. The output tells you nothing. So we asked a different question: does the model process them the same way inside? Think of it as a polygraph for a transformer. The words match; the internal signals might not.",
    "We took pairs of prompts that produced the identical next token, then probed the residual stream to see if the clean and corrupted versions were still separable inside the network.",
  ],
  method: [
    "Extracted activations with TransformerLens (hook_resid_post, last-token) across five models: GPT-2, GPT-2 Medium, Pythia-160M, Pythia-410M, GPT-Neo-125M.",
    "Trained three probes at every layer (nearest-class-mean, logistic regression, MLP) with pair-aware 5-fold cross-validation to stop the probe memorising question topics.",
    "Kept only output-invariant pairs: same top-1 next token, so any signal is purely internal.",
    "Tested causality with activation patching: swapping clean activations in at the peak layer, and projecting out the mass-mean direction.",
  ],
  findings: [
    "All five models showed strong linear separability. Peak linear-probe accuracy 0.958 to 0.975; the parameter-free baseline stayed at 0.82 to 0.94, so it is a real geometric difference, not a probe artefact.",
    "The signal peaked in the middle layers (8 to 12), where the model's representation of the input is most structured.",
    "Causal patching moved it: swapping clean activations at layer 8 shifted output probability by +0.14, and erasing the mass-mean direction by -0.05. The direction is causal, not just correlated.",
    "Ablation by corruption type: case changes were trivial to detect (1.0), spelling harder (0.88), punctuation near-invisible (0.5).",
  ],
  skills: [
    "Mechanistic interpretability",
    "Activation / linear probing",
    "TransformerLens",
    "Causal interventions (activation patching)",
    "Representation geometry (mass-mean directions, PCA)",
    "Probing methodology (CV, leakage control)",
    "Multi-model evaluation (GPT-2 / Pythia / GPT-Neo)",
    "PyTorch · scikit-learn",
  ],
  takeaway:
    "The same idea is a practical model-monitoring tool: if internal activations track a shift the output hides, probing can flag it. That is the bridge from interpretability research to AI safety and product reliability.",
};

export const labVerify =
  "Every code cell parses clean (45 notebooks, 232 cells, zero syntax errors). The classic notebooks run end to end on CPU with toy data. The heavy pieces (FlashAttention, vLLM serving, full RLHF) ship as teaching versions plus production templates.";

export const labRepo = "https://github.com/devwithjp/jp-nlp-lab";
