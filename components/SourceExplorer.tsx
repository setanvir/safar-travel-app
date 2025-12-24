
import React, { useState } from 'react';

interface CodeSnippet {
  name: string;
  path: string;
  language: string;
  code: string;
}

const SourceExplorer: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState(0);

  const snippets: CodeSnippet[] = [
    {
      name: 'UserAuthService.kt',
      path: 'safar-user-service/src/main/kotlin/com/safar/user/service/AuthService.kt',
      language: 'kotlin',
      code: `
package com.safar.user.service

import com.safar.user.domain.User
import com.safar.user.repository.UserRepository
import com.safar.user.security.JwtProvider
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service

/**
 * SRS 3.1: User Management & JWT Authentication
 */
@Service
class AuthService(
    private val userRepository: UserRepository,
    private val passwordEncoder: PasswordEncoder,
    private val jwtProvider: JwtProvider
) {
    suspend fun authenticate(email: String, rawPass: String): String? {
        val user = userRepository.findByEmail(email) ?: return null
        if (!passwordEncoder.matches(rawPass, user.password)) return null
        
        return jwtProvider.generateToken(user.email, user.role.name)
    }

    suspend fun register(user: User): User {
        // KYC logic for Agency role as per SRS 3.1
        if (user.role == UserRole.AGENCY) {
            user.kycStatus = KycStatus.PENDING
        }
        return userRepository.save(user.copy(password = passwordEncoder.encode(user.password)))
    }
}
      `.trim()
    },
    {
      name: 'PaymentProcessor.kt',
      path: 'safar-payment-service/src/main/kotlin/com/safar/payment/processor/StripeProcessor.kt',
      language: 'kotlin',
      code: `
package com.safar.payment.processor

import com.safar.payment.dto.PaymentRequest
import com.stripe.Stripe
import com.stripe.model.PaymentIntent
import com.stripe.param.PaymentIntentCreateParams
import org.springframework.stereotype.Component

/**
 * SRS 3.4: Payment Module (Stripe Integration)
 */
@Component
class StripeProcessor {
    init {
        Stripe.apiKey = System.getenv("STRIPE_SECRET_KEY")
    }

    suspend fun createPaymentIntent(request: PaymentRequest): String {
        val params = PaymentIntentCreateParams.builder()
            .setAmount((request.amount * 100).toLong()) // Cents
            .setCurrency(request.currency.lowercase())
            .putMetadata("booking_id", request.bookingId)
            .build()

        return PaymentIntent.create(params).clientSecret
    }
}
      `.trim()
    },
    {
      name: 'SharedViewModel.kt',
      path: 'safar-kmp-app/shared/src/commonMain/kotlin/com/safar/ui/home/HomeViewModel.kt',
      language: 'kotlin',
      code: `
package com.safar.ui.home

import com.safar.data.PackageRepository
import com.safar.model.TravelPackage
import kotlinx.coroutines.flow.*
import kotlinx.coroutines.launch
import moe.tlaster.precompose.viewmodel.ViewModel
import moe.tlaster.precompose.viewmodel.viewModelScope

/**
 * SRS 4.6: Intuitive, responsive UI via Compose Multiplatform
 */
class HomeViewModel(private val repository: PackageRepository) : ViewModel() {
    private val _state = MutableStateFlow<HomeState>(HomeState.Loading)
    val state: StateFlow<HomeState> = _state.asStateFlow()

    init {
        fetchPackages()
    }

    fun fetchPackages() {
        viewModelScope.launch {
            try {
                val data = repository.getTrendingPackages()
                _state.value = HomeState.Success(data)
            } catch (e: Exception) {
                _state.value = HomeState.Error(e.message ?: "Unknown Error")
            }
        }
    }
}

sealed class HomeState {
    object Loading : HomeState()
    data class Success(val packages: List<TravelPackage>) : HomeState()
    data class Error(val message: String) : HomeState()
}
      `.trim()
    },
    {
      name: 'Deployment.yaml',
      path: 'safar-infra/k8s/booking-deployment.yaml',
      language: 'yaml',
      code: `
apiVersion: apps/v1
kind: Deployment
metadata:
  name: booking-service
  namespace: safar-prod
spec:
  replicas: 3
  selector:
    matchLabels:
      app: booking-service
  template:
    metadata:
      labels:
        app: booking-service
    spec:
      containers:
      - name: booking-service
        image: gcr.io/safar-registry/booking-service:latest
        ports:
        - containerPort: 8080
        env:
        - name: SPRING_PROFILES_ACTIVE
          value: "prod"
        resources:
          limits:
            cpu: "500m"
            memory: "512Mi"
          requests:
            cpu: "250m"
            memory: "256Mi"
      `.trim()
    }
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="w-full lg:w-1/4 bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
        <h4 className="text-xs font-black uppercase text-slate-400 mb-6 px-2 tracking-[0.2em]">KMP Project Structure</h4>
        <div className="space-y-1">
          {snippets.map((s, idx) => (
            <button
              key={s.path}
              onClick={() => setSelectedFile(idx)}
              className={`w-full text-left px-4 py-3 rounded-xl text-[13px] flex items-center gap-3 transition-all ${
                selectedFile === idx ? 'bg-orange-50 text-orange-700 font-bold border border-orange-100 shadow-sm' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${s.language === 'kotlin' ? 'bg-orange-500' : 'bg-slate-400'}`}></div>
              <div className="truncate flex-1">
                <p className="font-mono text-[11px] leading-tight mb-0.5">{s.name}</p>
                <p className="text-[9px] text-slate-400 truncate opacity-70 italic">{s.path}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 bg-[#1a1c1e] rounded-3xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col min-h-[700px]">
        <div className="bg-[#242729] px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-red-500/90 shadow-lg shadow-red-500/20"></span>
              <span className="w-3.5 h-3.5 rounded-full bg-amber-500/90 shadow-lg shadow-amber-500/20"></span>
              <span className="w-3.5 h-3.5 rounded-full bg-green-500/90 shadow-lg shadow-green-500/20"></span>
            </div>
            <span className="text-[11px] font-mono text-slate-400 ml-4 font-bold tracking-wider">{snippets[selectedFile].path}</span>
          </div>
          <div className="px-3 py-1 bg-slate-800 rounded-lg">
            <span className="text-[9px] text-orange-400 uppercase font-black tracking-[0.2em]">{snippets[selectedFile].language}</span>
          </div>
        </div>
        <div className="p-8 font-mono text-[13px] overflow-auto flex-1 leading-[1.6]">
          <pre className="text-slate-300">
            <code>{snippets[selectedFile].code}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default SourceExplorer;
