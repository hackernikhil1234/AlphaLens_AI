const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String, enum: ['pending', 'running', 'completed', 'failed'], default: 'pending' },
  duration: { type: Number, default: null },
  evidence: { type: Number, default: null }
}, { _id: false });

const runSchema = new mongoose.Schema({
  ticker: { type: String, required: true, uppercase: true, trim: true, minlength: 1, maxlength: 5 },
  companyName: { type: String },
  status: { type: String, enum: ['pending', 'processing', 'completed', 'no_recommendation', 'failed'], default: 'pending' },
  agents: [agentSchema],
  debugLogs: [{ type: String }],
  report: {
    recommendation: { type: String },
    confidence: { type: Number, min: 0, max: 100 },
    reasoning: { type: String },
    sections: { type: mongoose.Schema.Types.Mixed },
    citations: [{ type: String }]
  }
}, { timestamps: true });

// Indexes
runSchema.index({ ticker: 1 });
runSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Run', runSchema);
