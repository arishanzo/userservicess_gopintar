<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RatingGuruRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
        'idprofilguru'    => 'required|string|max:255',
        'idbookingprivate'=> 'required|string|max:255',
        'rating'          => 'required|integer|min:1|max:5',
        'comment'         => 'required|string',
            ];

    }


     public function messages(): array
    {
        return [
        'idprofilguru.required' => 'ID User wajib diisi.',
        'idprofilguru.string' => 'ID User harus berupa string.',
        'idprofilguru.max' => 'ID User tidak boleh melebihi 255 karakter.',
        'idbookingprivate.required' => 'ID User wajib diisi.',
        'idbookingprivate.string' => 'ID User harus berupa string.',
        'idbookingprivate.max' => 'ID User tidak boleh melebihi 255 karakter.',
         'comment.required' => 'ID User wajib diisi.',
        ];
    }
}
